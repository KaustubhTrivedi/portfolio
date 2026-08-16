from dotenv import load_dotenv
from openai import OpenAI
import json
import os
import requests
from pypdf import PdfReader
import gradio as gr
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import chromadb
from chromadb.config import Settings
from chromadb.errors import NotFoundError, ChromaError
from langchain_text_splitters import RecursiveCharacterTextSplitter
import hashlib
from typing import List
import atexit
from posthog import Posthog

load_dotenv(override=True)

# Initialize PostHog
posthog_client = Posthog(
    project_api_key=os.getenv("POSTHOG_PROJECT_TOKEN"),
    host=os.getenv("POSTHOG_HOST", "https://eu.i.posthog.com"),
    enable_exception_autocapture=True,
)
atexit.register(posthog_client.shutdown)

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": ["*"],  # Allow all origins for dev
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "X-POSTHOG-DISTINCT-ID", "X-POSTHOG-SESSION-ID"],
    }
})

discord_webhook_url = os.getenv("DISCORD_WEBHOOK_URL")

if discord_webhook_url:
    print(f"Discord webhook URL found and starts with {discord_webhook_url[0]}")
else:
    print("Discord webhook URL not found")

# --- RAG retrieval configuration (env-tunable, sensible defaults) ---
# Candidate pool pulled from the vector store before filtering/reranking.
RAG_TOP_K = int(os.getenv("RAG_TOP_K", "20"))
# Final number of chunks handed to the LLM after reranking.
RAG_RERANK_TOP_N = int(os.getenv("RAG_RERANK_TOP_N", "5"))
# Max vector distance to keep a candidate. Chroma default space is L2, where
# smaller = more similar. Candidates above this are dropped as noise.
# Empty/unset disables the threshold (keeps all candidates).
_raw_threshold = os.getenv("RAG_DISTANCE_THRESHOLD", "").strip()
RAG_DISTANCE_THRESHOLD = float(_raw_threshold) if _raw_threshold else None
# Cheap/fast model used only to rerank retrieved chunks.
# Chat model. Must support tool calling and streaming. The previous default
# (stepfun/step-3.5-flash:free) was retired from the free tier and now 404s;
# set CHAT_MODEL to "stepfun/step-3.5-flash" to use the paid slug instead.
CHAT_MODEL = os.getenv("CHAT_MODEL", "nvidia/nemotron-3.5-lightning:free")

# A dedicated reranker model, served over OpenRouter's /rerank endpoint.
RAG_RERANK_MODEL = os.getenv(
    "RAG_RERANK_MODEL", "nvidia/llama-nemotron-rerank-vl-1b-v2:free"
)
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
# Per-doc-type chunking. "other" is the default until docs are categorized.
DOC_TYPE_CHUNKING = {
    "resume": (500, 100),
    "report": (1200, 200),
    "other": (1000, 200),
}

def push(message):
    print(f"Discord: {message}")
    if discord_webhook_url:
        payload = {"content": message}
        requests.post(discord_webhook_url, data=payload)

def _current_distinct_id():
    """Return the PostHog distinct ID from the request header, or a fallback anonymous ID."""
    try:
        return request.headers.get("X-POSTHOG-DISTINCT-ID") or "anonymous"
    except RuntimeError:
        return "anonymous"

def record_user_details(email, name="Name not provided", notes="not provided"):
    push(f"Recording {name} with email {email} and notes {notes}")
    posthog_client.capture(
        distinct_id=_current_distinct_id(),
        event="user_contact_recorded",
        properties={
            "has_name": name != "Name not provided",
            "has_notes": notes != "not provided",
        },
    )
    return {"recorded": "ok"}

def record_unknown_question(question):
    push(f"Recording {question}")
    posthog_client.capture(
        distinct_id=_current_distinct_id(),
        event="unknown_question_recorded",
        properties={
            "question_length": len(question),
        },
    )
    return {"recorded": "ok"}

record_user_details_json = {
    "name": "record_user_details",
    "description": "Use this tool to record that a user is interested in being in touch and provided an email address",
    "parameters": {
        "type": "object",
        "properties": {
            "email": {"type": "string", "description": "The email address of this user"},
            "name": {"type": "string", "description": "The user's name, if they provided it"},
            "notes": {"type": "string", "description": "Any additional information"}
        },
        "required": ["email"],
        "additionalProperties": False
    }
}

record_unknown_question_json = {
    "name": "record_unknown_question",
    "description": "Always use this tool to record any question that couldn't be answered",
    "parameters": {
        "type": "object",
        "properties": {
            "question": {"type": "string", "description": "The question that couldn't be answered"},
        },
        "required": ["question"],
        "additionalProperties": False
    }
}

tools = [{"type": "function", "function": record_user_details_json},
         {"type": "function", "function": record_unknown_question_json}]


class Me:

    def __init__(self):
        self.openai = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=os.getenv("OPENROUTER_API_KEY"),
        )
        self.name = "Kaustubh Trivedi"
        self.knowledge_path = "me/knowledge"
        
        self.chroma_client = self._connect_chroma()
        collection_name = "kaustubh_linkedin_profile"

        # --- SMART DB INITIALIZATION ---

        current_hash = self._get_folder_hash(self.knowledge_path)
        print(f"Current Knowledge Hash: {current_hash}")
        self._ensure_collection(collection_name, current_hash)

        # Read summary
        with open("me/summary.txt", "r", encoding="utf-8") as f:
            self.summary = f.read()
    def _ensure_collection(self, collection_name: str, current_hash: str):
        """Point self.collection at a collection matching the knowledge folder.

        The folder hash is stamped only once indexing has actually succeeded.
        Stamping it at creation time meant a failed embedding run left an empty
        collection marked up to date, so every later boot saw a hash match and
        skipped indexing — the RAG then silently returned no context forever.
        An empty collection is therefore also treated as stale."""
        existing = None
        try:
            existing = self.chroma_client.get_collection(name=collection_name)
        except Exception as e:
            print(f"Collection not found ({type(e).__name__}). Creating new...")

        if existing is not None:
            stored_hash = (existing.metadata or {}).get("pdf_hash", "")
            count = existing.count()
            if stored_hash == current_hash and count > 0:
                print(f"✅ Collection loaded successfully ({count} chunks). Hash matches.")
                self.collection = existing
                return
            reason = "hash mismatch" if stored_hash != current_hash else "collection is empty"
            print(f"⚠ Rebuilding — {reason} (stored: {stored_hash or 'none'})")
            try:
                self.chroma_client.delete_collection(collection_name)
            except Exception as e:
                print(f"Could not delete stale collection: {e}")

        self.collection = self.chroma_client.create_collection(
            name=collection_name,
            metadata={"description": "Kaustubh Profile"},
        )

        try:
            self._process_and_store_knowledge(current_hash)
        except Exception as e:
            # Leave the hash unstamped so the next boot retries instead of
            # treating this half-built collection as current.
            print(f"❌ Indexing failed, collection left unstamped for retry: {e}")
            return

        self.collection.modify(
            metadata={"description": "Kaustubh Profile", "pdf_hash": current_hash}
        )
        print(f"✅ Indexed {self.collection.count()} chunks.")

    def _connect_chroma(self):
        """Connect to Chroma Cloud, or a self-hosted Chroma if no API key is set.

        Production uses Chroma Cloud (CHROMA_API_KEY / CHROMA_TENANT /
        CHROMA_DATABASE). Falling back to CHROMADB_HOST keeps a local or
        homelab Chroma usable for development without cloud credentials."""
        api_key = os.getenv("CHROMA_API_KEY")
        if api_key:
            tenant = os.getenv("CHROMA_TENANT")
            database = os.getenv("CHROMA_DATABASE")
            if not tenant or not database:
                raise RuntimeError(
                    "CHROMA_API_KEY is set but CHROMA_TENANT/CHROMA_DATABASE are missing"
                )
            print(f"Connecting to Chroma Cloud (database: {database})")
            return chromadb.CloudClient(
                tenant=tenant,
                database=database,
                api_key=api_key,
                cloud_host=os.getenv("CHROMA_HOST", "api.trychroma.com"),
            )

        chromadb_host = os.getenv("CHROMADB_HOST", "http://homelab:8000")
        use_ssl = chromadb_host.startswith("https://")
        host_part = chromadb_host.replace("https://", "").replace("http://", "").split("/")[0]
        if ":" in host_part:
            hostname, port_str = host_part.rsplit(":", 1)
            port = int(port_str)
        else:
            hostname = host_part
            port = 443 if use_ssl else 8000

        print(f"Connecting to self-hosted Chroma at {hostname}:{port}")
        return chromadb.HttpClient(host=hostname, port=port, ssl=use_ssl)

    def _get_folder_hash(self, folder_path: str) -> str:
        """Calculate a single hash for all files in a folder"""
        if not os.path.exists(folder_path):
            return "no_folder"
        
        hasher = hashlib.md5()
        # Sort files to ensure the hash is always the same for the same content
        for filename in sorted(os.listdir(folder_path)):
            filepath = os.path.join(folder_path, filename)
            if os.path.isfile(filepath):
                # Hash the filename (so renaming a file triggers a change)
                hasher.update(filename.encode())
                # Hash the content
                with open(filepath, "rb") as f:
                    hasher.update(f.read())
                    
        return hasher.hexdigest()
    
    def _doc_type_for(self, filename: str) -> str:
        """Classify a knowledge file into a doc_type for metadata + chunk sizing.

        Defaults to "other". Extend this mapping as documents are categorized —
        either by filename convention or an explicit per-file map."""
        name = filename.lower()
        if "resume" in name or "cv" in name:
            return "resume"
        if "report" in name:
            return "report"
        return "other"

    def _chunk_text(self, text: str, chunk_size: int = 1000, chunk_overlap: int = 200) -> List[str]:
        """Recursive splitting to respect sentence boundaries"""
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", ". ", " ", ""] 
        )
        return text_splitter.split_text(text)
    
    def _process_and_store_knowledge(self, current_hash):
        """Ingest ALL files from the knowledge folder"""
        folder_path = "me/knowledge"
        all_chunks = []
        all_ids = []
        all_metadatas = [] # We'll store which file the chunk came from!

        print(f"Processing knowledge from {folder_path}...")

        if not os.path.exists(folder_path):
            print(f"Folder {folder_path} does not exist.")
            return

        # Loop through every file in the folder
        for filename in os.listdir(folder_path):
            filepath = os.path.join(folder_path, filename)
            file_text = ""
            
            try:
                # Handle PDF
                if filename.endswith(".pdf"):
                    reader = PdfReader(filepath)
                    for page in reader.pages:
                        text = page.extract_text()
                        if text: file_text += text + "\n"
                
                # Handle Text/Markdown
                elif filename.endswith(".txt") or filename.endswith(".md"):
                    with open(filepath, "r", encoding="utf-8") as f:
                        file_text = f.read()
                
                else:
                    continue # Skip unsupported files

                # Chunk this specific file, sized per doc_type
                if file_text:
                    doc_type = self._doc_type_for(filename)
                    chunk_size, chunk_overlap = DOC_TYPE_CHUNKING.get(
                        doc_type, DOC_TYPE_CHUNKING["other"]
                    )
                    file_chunks = self._chunk_text(file_text, chunk_size, chunk_overlap)
                    print(f"  - {filename} [{doc_type}]: {len(file_chunks)} chunks")

                    for i, chunk in enumerate(file_chunks):
                        all_chunks.append(chunk)
                        # Create a unique ID: "filename_chunkIndex"
                        safe_name = filename.replace(".", "_").replace(" ", "_")
                        all_ids.append(f"{safe_name}_{i}")
                        # Store metadata so you know where this info came from later
                        all_metadatas.append({"source": filename, "doc_type": doc_type})

            except Exception as e:
                print(f"Error processing file {filename}: {e}")

        # Batch Embed & Store (Same logic as before, just with the accumulated lists)
        if all_chunks:
            batch_size = 100
            all_embeddings = []
            
            print(f"Generating embeddings for {len(all_chunks)} total chunks...")
            for i in range(0, len(all_chunks), batch_size):
                batch = all_chunks[i:i + batch_size]
                response = self.openai.embeddings.create(
                    extra_headers={
                        "HTTP-Referer": "https://portfolio.kaustubhsstuff.com",
                        "X-Title": "Kaustubh Trivedi Portfolio",
                    },
                    model="thenlper/gte-base",
                    input=batch,
                    encoding_format="float"
                )
                batch_embeddings = [item.embedding for item in response.data]
                all_embeddings.extend(batch_embeddings)
            
            self.collection.add(
                ids=all_ids,
                embeddings=all_embeddings,
                documents=all_chunks,
                metadatas=all_metadatas 
            )
            print("Knowledge base updated successfully!")

    def handle_tool_call(self, tool_calls):
        results = []
        for tool_call in tool_calls:
            tool_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)
            print(f"Tool called: {tool_name}", flush=True)
            tool = globals().get(tool_name)
            result = tool(**arguments) if tool else {}
            results.append({"role": "tool","content": json.dumps(result),"tool_call_id": tool_call.id})
        return results

    def _get_relevant_context(self, query: str) -> str:
        """Retrieve context via vector search, distance filtering, then LLM rerank.

        Pipeline: embed query -> fetch RAG_TOP_K candidates -> drop candidates
        past RAG_DISTANCE_THRESHOLD -> LLM rerank down to RAG_RERANK_TOP_N."""
        try:
            response = self.openai.embeddings.create(
                extra_headers={
                    "HTTP-Referer": "https://portfolio.kaustubhsstuff.com",
                    "X-Title": "Kaustubh Trivedi Portfolio",
                },
                model="thenlper/gte-base",
                input=query,
                encoding_format="float"
            )
            query_embedding = response.data[0].embedding

            results = self.collection.query(
                query_embeddings=[query_embedding],
                n_results=RAG_TOP_K,
                include=["documents", "distances"],
            )

            docs = (results.get("documents") or [[]])[0]
            distances = (results.get("distances") or [[]])[0]
            if not docs:
                return ""

            # Distance threshold: keep only candidates at/under the cutoff.
            if RAG_DISTANCE_THRESHOLD is not None and distances:
                filtered = [
                    doc for doc, dist in zip(docs, distances)
                    if dist <= RAG_DISTANCE_THRESHOLD
                ]
                docs = filtered

            if not docs:
                # Everything was filtered out as too dissimilar — no context.
                return ""

            # LLM rerank down to the final N most relevant chunks.
            top_docs = self._rerank(query, docs)
            return "\n\n".join(top_docs)
        except Exception as e:
            print(f"Error during context retrieval: {e}")

        return ""

    def _rerank(self, query: str, docs: List[str]) -> List[str]:
        """Rerank candidate chunks with a dedicated cross-encoder reranker.

        Uses OpenRouter's /rerank endpoint: reranker models are not served over
        /chat/completions and return 404 there, so this cannot go through the
        OpenAI client. Returns up to RAG_RERANK_TOP_N docs in relevance order;
        on any failure falls back to the original vector order (truncated)."""
        if len(docs) <= RAG_RERANK_TOP_N:
            return docs
        try:
            resp = requests.post(
                f"{OPENROUTER_BASE_URL}/rerank",
                headers={
                    "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://kaustubhsstuff.com",
                    "X-Title": "Kaustubh Trivedi Portfolio",
                },
                json={
                    "model": RAG_RERANK_MODEL,
                    "query": query,
                    "documents": docs,
                    "top_n": RAG_RERANK_TOP_N,
                },
                timeout=30,
            )
            resp.raise_for_status()
            results = resp.json().get("results") or []
            ranked = [
                docs[r["index"]]
                for r in sorted(
                    results, key=lambda r: r.get("relevance_score", 0), reverse=True
                )
                if isinstance(r.get("index"), int) and 0 <= r["index"] < len(docs)
            ]
            if ranked:
                return ranked[:RAG_RERANK_TOP_N]
        except Exception as e:
            print(f"Rerank failed, falling back to vector order: {e}")
        return docs[:RAG_RERANK_TOP_N]

    def system_prompt(self, user_query: str = ""):
        system_prompt = f"You are acting as {self.name}. You are answering questions on {self.name}'s website... (rest of prompt)"
        # Shortened for brevity in code, but keeps original logic
        system_prompt = f"You are acting as {self.name}. You are answering questions on {self.name}'s website, \
particularly questions related to {self.name}'s career, background, skills and experience. \
Your responsibility is to represent {self.name} for interactions on the website as faithfully as possible. \
You are given a summary of {self.name}'s background and relevant information from LinkedIn profile which you can use to answer questions. \
Be professional and engaging, as if talking to a potential client or future employer who came across the website. \
If you don't know the answer to any question, use your record_unknown_question tool to record the question that you couldn't answer. \
If the user is engaging in discussion, try to steer them towards getting in touch via email; ask for their email and record it using your record_user_details tool. "

        system_prompt += f"\n\n## Summary:\n{self.summary}\n\n"
        
        if user_query:
            relevant_context = self._get_relevant_context(user_query)
            if relevant_context:
                system_prompt += f"## Relevant Information from LinkedIn Profile:\n{relevant_context}\n\n"
        
        system_prompt += f"With this context, please chat with the user, always staying in character as {self.name}."
        return system_prompt

    def chat(self, message, history):
        system_content = self.system_prompt(user_query=message)
        messages = [{"role": "system", "content": system_content}] + history + [{"role": "user", "content": message}]
        done = False
        while not done:
            response = self.openai.chat.completions.create(model=CHAT_MODEL, messages=messages, tools=tools)
            if response.choices[0].finish_reason=="tool_calls":
                message = response.choices[0].message
                tool_calls = message.tool_calls
                results = self.handle_tool_call(tool_calls)
                messages.append(message)
                messages.extend(results)
            else:
                done = True
        return response.choices[0].message.content

    def chat_api(self, message, history=None):
        if history is None:
            history = []
        return self.chat(message, history)

    def chat_stream(self, message, history):
        """Generator that yields content chunks for SSE streaming."""
        system_content = self.system_prompt(user_query=message)
        messages = [{"role": "system", "content": system_content}] + history + [{"role": "user", "content": message}]

        # Handle tool calls in a blocking loop first
        while True:
            response = self.openai.chat.completions.create(
                model=CHAT_MODEL,
                messages=messages,
                tools=tools,
            )
            if response.choices[0].finish_reason == "tool_calls":
                assistant_message = response.choices[0].message
                tool_calls = assistant_message.tool_calls
                results = self.handle_tool_call(tool_calls)
                messages.append(assistant_message)
                messages.extend(results)
            else:
                break

        # Now stream the final response
        stream = self.openai.chat.completions.create(
            model=CHAT_MODEL,
            messages=messages,
            stream=True,
        )
        for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

# Initialize
me_instance = Me()

# Flask Routes
@app.route('/api/chat', methods=['POST'])
def chat_endpoint():
    try:
        data = request.get_json()
        message = data.get('message')
        history = data.get('history', [])
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        distinct_id = _current_distinct_id()
        posthog_client.capture(
            distinct_id=distinct_id,
            event="chat_message_sent",
            properties={
                "message_length": len(message),
                "history_length": len(history),
            },
        )
        response = me_instance.chat_api(message, history)
        return jsonify({'response': response})
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        posthog_client.capture_exception(e, distinct_id=_current_distinct_id())
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/api/chat/stream', methods=['POST'])
def chat_stream_endpoint():
    try:
        data = request.get_json()
        message = data.get('message')
        history = data.get('history', [])
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        distinct_id = _current_distinct_id()
        posthog_client.capture(
            distinct_id=distinct_id,
            event="chat_stream_started",
            properties={
                "message_length": len(message),
                "history_length": len(history),
            },
        )

        def generate():
            try:
                for content_chunk in me_instance.chat_stream(message, history):
                    yield f"data: {json.dumps({'content': content_chunk})}\n\n"
                yield "data: [DONE]\n\n"
            except Exception as e:
                print(f"Error during streaming: {e}")
                posthog_client.capture_exception(e, distinct_id=distinct_id)
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

        response = Response(
            generate(),
            mimetype='text/event-stream',
            headers={
                'Cache-Control': 'no-cache',
                'X-Accel-Buffering': 'no',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        )
        return response
    except Exception as e:
        print(f"Error in stream endpoint: {e}")
        posthog_client.capture_exception(e, distinct_id=_current_distinct_id())
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

@app.route('/api/clear_history', methods=['POST'])
def clear_history():
    return jsonify({'status': 'success', 'message': 'Chat history cleared'})

if __name__ == "__main__":
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    # Must match Dockerfile EXPOSE/HEALTHCHECK and the compose port mapping.
    port = int(os.getenv('PORT', '5000'))
    app.run(host='0.0.0.0', port=port, debug=debug_mode)