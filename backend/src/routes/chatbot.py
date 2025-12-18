import google.generativeai as genai
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os

router = APIRouter(prefix="/api/chatbot", tags=["chatbot"])

# Configure Google API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "AIzaSyBpYZZL26iER6pHT0_uM3V2EW1Qr-wzOF8")
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the model
model = genai.GenerativeModel('gemini-pro')

class ChatRequest(BaseModel):
    message: str
    conversation_history: list = []

class ChatResponse(BaseModel):
    response: str
    timestamp: str

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Handle chatbot requests"""
    try:
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Build conversation history
        chat = model.start_chat()
        
        # Add previous messages to context
        for msg in request.conversation_history:
            if msg.get("role") == "user":
                chat.send_message(msg.get("content"), stream=False)
            else:
                chat.send_message(msg.get("content"), stream=False)
        
        # Send the new message and get response
        response = chat.send_message(request.message)
        
        from datetime import datetime
        return ChatResponse(
            response=response.text,
            timestamp=datetime.now().isoformat()
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chatbot error: {str(e)}")

@router.get("/health")
async def health_check():
    """Health check for chatbot service"""
    return {"status": "chatbot service is running"}
