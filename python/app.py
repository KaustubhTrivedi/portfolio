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
from typing import List


load_dotenv(override=True)

# Initialize Flask app
app = Flask(__name__)

# Configure CORS for frontend integration
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:4321",  # Astro dev server
            "http://localhost:3004",  # Production frontend
            "http://127.0.0.1:4321",
            "http://127.0.0.1:3004",
            "http://localhost:3000",  # Common dev port
            "http://127.0.0.1:3000",
            "https://gradio.kaustubhsstuff.com",
            "https://portfolio.kaustubhsstuff.com",
            "*"  # Allow all origins in development
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Add CORS headers to all responses
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
            "email": {
                "type": "string",
                "description": "The email address of this user"
            },
            "name": {
                "type": "string",
                "description": "The user's name, if they provided it"
            }
            ,
            "notes": {
                "type": "string",
                "description": "Any additional information about the conversation that's worth recording to give context"
            }
        },
        "required": ["email"],
        "additionalProperties": False
    }
}

record_unknown_question_json = {
    "name": "record_unknown_question",
    "description": "Always use this tool to record any question that couldn't be answered as you didn't know the answer",
    "parameters": {
        "type": "object",
        "properties": {
            "question": {
                "type": "string",
                "description": "The question that couldn't be answered"
            },
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
        
        # Connect to ChromaDB
        chromadb_host = os.getenv("CHROMADB_HOST", "https://chromadb.kaustubhsstuff.com")
        # Extract hostname from URL
        hostname = chromadb_host.replace("https://", "").replace("http://", "").split("/")[0]
        # Default ports: 8000 for HTTP, 443 for HTTPS
        port = 443 if "https" in chromadb_host else 8000
        
        self.chroma_client = chromadb.HttpClient(
            host=hostname,
            port=port,
            ssl=True
        )
        
        # Get or create collection
        collection_name = "kaustubh_linkedin_profile"
        try:
            # Use get_or_create_collection - handles existence check gracefully
            # This avoids the "try get, catch all, create" anti-pattern
            self.collection = self.chroma_client.get_or_create_collection(
                name=collection_name,
                metadata={"description": "Kaustubh LinkedIn profile embeddings"}
            )
            # Check if collection is empty
            count = self.collection.count()
            if count == 0:
                print(f"Collection exists but is empty. Processing PDF...")
                self._process_and_store_pdf()
            else:
                print(f"Loaded existing ChromaDB collection: {collection_name} with {count} chunks")
        except (KeyError, ChromaError) as e:
            # Handle version mismatch or other Chroma-specific errors
            # KeyError('_type') indicates version mismatch - collection exists but can't parse response
            error_str = str(e)
            error_type = type(e).__name__
            
            if "_type" in error_str or error_type == "KeyError":
                # Version mismatch: collection exists but client can't parse it
                print(f"ERROR: Version mismatch between Chroma client and server detected!")
                print(f"  Client version: chromadb==0.5.20")
                print(f"  Error: {e}")
                print(f"  The collection exists on the server but the client cannot parse the response.")
                print(f"  Please ensure Chroma server version matches client version (0.5.20).")
                print(f"\n  Attempting to work around by checking if collection exists...")
                
                # Check if collection exists without parsing full response
                try:
                    collections = self.chroma_client.list_collections()
                    collection_exists = any(c.name == collection_name for c in collections)
                    
                    if collection_exists:
                        print(f"  Collection '{collection_name}' exists on server.")
                        print(f"  WARNING: Cannot access collection due to version mismatch.")
                        print(f"  Please update Chroma server to version 0.5.20 or update client to match server version.")
                        raise RuntimeError(
                            f"Version mismatch: Collection exists but cannot be accessed. "
                            f"Please align Chroma server and client versions."
                        ) from e
                    else:
                        # Collection doesn't exist - this shouldn't happen if we got KeyError
                        print(f"  Collection does not exist. This is unexpected given the error type.")
                        raise
                except Exception as check_e:
                    print(f"  Failed to check collection existence: {check_e}")
                    raise RuntimeError(
                        f"Version mismatch error. Please align Chroma server and client versions."
                    ) from e
            elif "already exists" in error_str or "409" in error_str:
                # Collection exists - try to get it directly
                print(f"Collection already exists. Accessing directly...")
                try:
                    self.collection = self.chroma_client.get_collection(name=collection_name)
                    count = self.collection.count()
                    if count == 0:
                        print(f"Collection exists but is empty. Processing PDF...")
                        self._process_and_store_pdf()
                    else:
                        print(f"Loaded existing ChromaDB collection: {collection_name} with {count} chunks")
                except Exception as get_e:
                    print(f"Failed to access existing collection: {get_e}")
                    raise
            else:
                # Other ChromaError
                print(f"Chroma server error: {e}")
                raise
        except Exception as e:
            # Catch-all for unexpected errors
            print(f"Unexpected error while initializing collection: {e}")
            print(f"Error type: {type(e).__name__}")
            raise
        
        # Read summary (still static)
        with open("me/summary.txt", "r", encoding="utf-8") as f:
            self.summary = f.read()
    
    def _chunk_text(self, text: str, chunk_size: int = 1000, chunk_overlap: int = 200) -> List[str]:
        """Split text into overlapping chunks"""
        chunks = []
        start = 0
        while start < len(text):
            end = start + chunk_size
            chunk = text[start:end]
            chunks.append(chunk)
            start = end - chunk_overlap
        return chunks
    
    def _process_and_store_pdf(self):
        """Extract PDF text, chunk it, create embeddings, and store in ChromaDB"""
        print("Processing PDF and creating embeddings...")
        reader = PdfReader("me/kaustubh_main_august.pdf")
        full_text = ""
        for page in reader.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
        
        # Chunk the text
        chunks = self._chunk_text(full_text)
        print(f"Created {len(chunks)} chunks from PDF")
        
        # Create embeddings and store in ChromaDB
        documents = []
        ids = []
        for i, chunk in enumerate(chunks):
            documents.append(chunk)
            ids.append(f"chunk_{i}")
        
        # Use OpenRouter embeddings (batch process for efficiency)
        batch_size = 100
        all_embeddings = []
        for i in range(0, len(chunks), batch_size):
            batch = chunks[i:i + batch_size]
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
        
        # Store in ChromaDB
        self.collection.add(
            ids=ids,
            embeddings=all_embeddings,
            documents=documents
        )
        print(f"Stored {len(chunks)} chunks in ChromaDB")


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
        """Query ChromaDB for relevant context based on user query"""
        # Create embedding for the query
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
        
        # Query ChromaDB
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )
        
        # Combine relevant chunks
        if results['documents'] and len(results['documents'][0]) > 0:
            relevant_chunks = "\n\n".join(results['documents'][0])
            return relevant_chunks
        return ""
    
    def system_prompt(self, user_query: str = ""):
        system_prompt = f"You are acting as {self.name}. You are answering questions on {self.name}'s website, \
particularly questions related to {self.name}'s career, background, skills and experience. \
Your responsibility is to represent {self.name} for interactions on the website as faithfully as possible. \
You are given a summary of {self.name}'s background and relevant information from LinkedIn profile which you can use to answer questions. \
Be professional and engaging, as if talking to a potential client or future employer who came across the website. \
If you don't know the answer to any question, use your record_unknown_question tool to record the question that you couldn't answer, even if it's about something trivial or unrelated to career. \
If the user is engaging in discussion, try to steer them towards getting in touch via email; ask for their email and record it using your record_user_details tool. "

        system_prompt += f"\n\n## Summary:\n{self.summary}\n\n"
        
        # Get relevant context from ChromaDB if query is provided
        if user_query:
            relevant_context = self._get_relevant_context(user_query)
            if relevant_context:
                system_prompt += f"## Relevant Information from LinkedIn Profile:\n{relevant_context}\n\n"
        
        system_prompt += f"With this context, please chat with the user, always staying in character as {self.name}."
        return system_prompt

    def chat(self, message, history):
        # Get relevant context based on user message
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
        """API version of chat function that accepts history as a parameter"""
        if history is None:
            history = []
        return self.chat(message, history)

# Initialize the Me instance
me_instance = Me()

# Flask API endpoint
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

@app.route('/api/chat', methods=['OPTIONS'])
def chat_options():
    """Handle preflight requests for CORS"""
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

@app.route('/api/clear_history', methods=['POST'])
def clear_history():
    try:
        # This endpoint can be used to clear server-side chat history if needed
        # For now, we'll just return success since the frontend handles clearing
        return jsonify({'status': 'success', 'message': 'Chat history cleared'})
    except Exception as e:
        print(f"Error in clear history endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == "__main__":
    # Run Flask app on port 5000
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)
    
    # Uncomment the line below if you want to run Gradio instead
    # gr.ChatInterface(me_instance.chat, type="messages").launch()