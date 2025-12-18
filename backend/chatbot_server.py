from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from datetime import datetime
import uvicorn

app = FastAPI(title="For Today's Youth Chatbot API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Google API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "AIzaSyBpYZZL26iER6pHT0_uM3V2EW1Qr-wzOF8")
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the model
model = genai.GenerativeModel('gemini-pro')

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    timestamp: str

# Store conversation history per session
conversation_store = {}

@app.get("/health")
async def health_check():
    """Health check for chatbot service"""
    return {"status": "running", "message": "Chatbot service is healthy"}

@app.post("/chat")
async def chat(request: ChatRequest):
    """Handle chatbot requests"""
    try:
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Create a chat session
        chat = model.start_chat(
            history=[]
        )
        
        # Send the message and get response
        response = chat.send_message(request.message)
        
        return ChatResponse(
            response=response.text,
            timestamp=datetime.now().isoformat()
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chatbot error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001)
