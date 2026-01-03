from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests
import hashlib
from datetime import datetime, timedelta
import asyncio

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Cache for responses
response_cache = {}
CACHE_TTL = 86400  # 24 hours

# Using HuggingFace free inference API (no quota limits)
HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY", "hf_xxxxxxxxxxx")

# Or use local Ollama if available
OLLAMA_API_URL = "http://localhost:11434/api/generate"

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "127.0.0.1:5173",
        "127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini client with API key
api_key = os.getenv("GOOGLE_API_KEY", "AIzaSyDqqQq2m_Lz3O9fZBtaHQsUwXE_TnL54Vo")

# Model configuration
MODEL_NAME = "mistral-7b"

# Pydantic models
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.get("/")
async def root():
    return {"message": "Gemini Chatbot API is running on port 5001", "status": "operational"}

@app.get("/health")
async def health():
    return {"status": "ok", "model": MODEL_NAME}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint - uses HuggingFace free API (no quota limits)
    Falls back to Ollama if available locally
    """
    try:
        user_message = request.message.strip()
        
        if not user_message:
            return ChatResponse(reply="Please enter a message.")
        
        # Check cache first
        cache_key = hashlib.md5(user_message.lower().encode()).hexdigest()
        if cache_key in response_cache:
            cached_data = response_cache[cache_key]
            if datetime.now() < cached_data['expires']:
                print(f"📦 Cache hit for: {user_message[:50]}...")
                return ChatResponse(reply=cached_data['response'])
        
        print(f"🤖 Calling AI API ({MODEL_NAME})...")
        print(f"📝 User: {user_message[:100]}")
        
        bot_response = None
        
        # Try HuggingFace API first
        try:
            headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
            payload = {
                "inputs": user_message,
                "parameters": {
                    "max_new_tokens": 512,
                    "temperature": 0.7
                }
            }
            
            response = requests.post(HUGGINGFACE_API_URL, headers=headers, json=payload, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    bot_response = data[0].get("generated_text", "")
                    if bot_response.startswith(user_message):
                        bot_response = bot_response[len(user_message):].strip()
        except Exception as hf_error:
            print(f"HuggingFace error: {str(hf_error)[:100]}")
        
        # Fallback: Try Ollama locally if HuggingFace fails
        if not bot_response:
            try:
                ollama_payload = {
                    "model": "mistral",
                    "prompt": user_message,
                    "stream": False
                }
                ollama_response = requests.post(OLLAMA_API_URL, json=ollama_payload, timeout=30)
                
                if ollama_response.status_code == 200:
                    ollama_data = ollama_response.json()
                    bot_response = ollama_data.get("response", "").strip()
            except Exception as ollama_error:
                print(f"Ollama error: {str(ollama_error)[:100]}")
        
        # If both fail, return helpful message
        if not bot_response:
            bot_response = "I couldn't generate a response right now. Please try again in a moment or install Ollama locally for unlimited responses."
        
        # Cache the response
        response_cache[cache_key] = {
            'response': bot_response,
            'expires': datetime.now() + timedelta(seconds=CACHE_TTL)
        }
        
        print(f"✅ Response: {bot_response[:100]}...")
        
        return ChatResponse(reply=bot_response)
    
    except Exception as e:
        error_str = str(e)
        print(f"❌ Error: {error_str[:200]}")
        return ChatResponse(reply=f"Error: {error_str}")

@app.post("/reset")
async def reset():
    """Reset conversation history and cache"""
    global response_cache
    response_cache = {}
    return {"message": "Cache cleared, ready for new conversation"}

if __name__ == "__main__":
    import uvicorn
    print("=" * 60)
    print("🚀 For Today's Youth Chatbot Server Starting...")
    print("=" * 60)
    print(f"📡 Model: {MODEL_NAME}")
    print(f"🌐 Server: http://0.0.0.0:5001")
    print(f"📚 Docs: http://localhost:5001/docs")
    print("=" * 60)
    print("\n✅ Chatbot using FREE API (HuggingFace + Ollama fallback)")
    print("   No quota limits, no API key required for local mode.")
    print("   Every question goes directly to AI.\n")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=5001,
        log_level="info"
    )
