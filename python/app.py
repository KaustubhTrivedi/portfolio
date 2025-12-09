from dotenv import load_dotenv
from openai import OpenAI
import json
import os
import requests
from pypdf import PdfReader
import gradio as gr
from flask import Flask, request, jsonify
from flask_cors import CORS
import chromadb
from chromadb.config import Settings
from chromadb.errors import NotFoundError, ChromaError
from langchain.text_splitter import RecursiveCharacterTextSplitter
import hashlib
from typing import List

load_dotenv(override=True)

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": ["*"],  # Allow all origins for dev
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

discord_webhook_url = os.getenv("DISCORD_WEBHOOK_URL")

if discord_webhook_url:
    print(f"Discord webhook URL found and starts with {discord_webhook_url[0]}")
else:
    print("Discord webhook URL not found")

def push(message):
    print(f"Discord: {message}")
    if discord_webhook_url:
        payload = {"content": message}
        requests.post(discord_webhook_url, data=payload)

def record_user_details(email, name="Name not provided", notes="not provided"):
    push(f"Recording {name} with email {email} and notes {notes}")
    return {"recorded": "ok"}

def record_unknown_question(question):
    push(f"Recording {question}")
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
        
        # Connect to ChromaDB
        chromadb_host = os.getenv("CHROMADB_HOST", "https://chromadb.kaustubhsstuff.com")
        hostname = chromadb_host.replace("https://", "").replace("http://", "").split("/")[0]
        port = 443 if "https" in chromadb_host else 8000
        
        self.chroma_client = chromadb.HttpClient(host=hostname, port=port, ssl=True)
        collection_name = "kaustubh_linkedin_profile"

        # --- SMART DB INITIALIZATION ---
        
        # 1. Calculate Folder Hash
        current_hash = self._get_folder_hash(self.knowledge_path)
        print(f"Current Knowledge Hash: {current_hash}")

        try:
            # 2. Try to get the existing collection
            self.collection = self.chroma_client.get_collection(name=collection_name)
            
            # 3. Safely Check Metadata (Handle case where metadata is None)
            existing_metadata = self.collection.metadata
            if existing_metadata is None:
                existing_metadata = {}
                
            stored_hash = existing_metadata.get("pdf_hash", "")
            
            # 4. Compare Hashes
            if stored_hash != current_hash:
                print(f"⚠ Hash Mismatch (Stored: {stored_hash} vs Current: {current_hash})")
                print("Rebuilding database with new content...")
                
                # Delete the old one
                self.chroma_client.delete_collection(collection_name)
                
                # Create the new one
                self.collection = self.chroma_client.create_collection(
                    name=collection_name,
                    metadata={"description": "Kaustubh Profile", "pdf_hash": current_hash}
                )
                self._process_and_store_knowledge(current_hash)
            else:
                print(f"✅ Collection loaded successfully. Knowledge hash matches.")

        except Exception as e:
            # If get_collection failed (likely because it didn't exist), we create it here
            print(f"Collection not found or error accessing it ({type(e).__name__}). Creating new...")
            try:
                # Ensure it's really gone before creating
                try: self.chroma_client.delete_collection(collection_name)
                except: pass
                
                self.collection = self.chroma_client.create_collection(
                    name=collection_name,
                    metadata={"description": "Kaustubh Profile", "pdf_hash": current_hash}
                )
                self._process_and_store_knowledge(current_hash)
            except Exception as create_error:
                print(f"Final Error creating collection: {create_error}")

        # Read summary
        with open("me/summary.txt", "r", encoding="utf-8") as f:
            self.summary = f.read()
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

                # Chunk this specific file
                if file_text:
                    file_chunks = self._chunk_text(file_text)
                    print(f"  - {filename}: {len(file_chunks)} chunks")
                    
                    for i, chunk in enumerate(file_chunks):
                        all_chunks.append(chunk)
                        # Create a unique ID: "filename_chunkIndex"
                        safe_name = filename.replace(".", "_").replace(" ", "_")
                        all_ids.append(f"{safe_name}_{i}")
                        # Store metadata so you know where this info came from later
                        all_metadatas.append({"source": filename})

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

    def _get_relevant_context(self, query: str, n_results: int = 5) -> str:
        """Query ChromaDB for relevant context"""
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
                n_results=n_results
            )
            
            if results['documents'] and len(results['documents'][0]) > 0:
                return "\n\n".join(results['documents'][0])
        except Exception as e:
            print(f"Error during context retrieval: {e}")
            
        return ""
    
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
            response = self.openai.chat.completions.create(model="gpt-4o-mini", messages=messages, tools=tools)
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
        response = me_instance.chat_api(message, history)
        return jsonify({'response': response})
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

@app.route('/api/clear_history', methods=['POST'])
def clear_history():
    return jsonify({'status': 'success', 'message': 'Chat history cleared'})

if __name__ == "__main__":
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)