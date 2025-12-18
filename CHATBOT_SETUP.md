# AI Chatbot Setup Guide

## Overview
The chatbot feature uses Google's Gemini AI API to provide intelligent responses about courses, jobs, and career guidance.

## Backend Setup

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Start the Chatbot Server
```bash
python chatbot_server.py
```

The chatbot server will start on `http://localhost:5001`

### Environment Configuration
The API key is already configured in `backend/.env`:
```
GOOGLE_API_KEY=AIzaSyBpYZZL26iER6pHT0_uM3V2EW1Qr-wzOF8
```

## Frontend Setup

### ChatbotPage Component
- Location: `for_today's_youth/src/pages/ChatbotPage.jsx`
- Route: `/chatbot`
- Only accessible to authenticated users

### Navbar Integration
- Added "🤖 AI Chat" button in the navbar
- Only visible for logged-in users
- Positioned between Profile and Contact Us

## Features

✨ **Real-time Messaging**: Instant responses from Google's Gemini AI
🎯 **Career Guidance**: Ask about courses, jobs, skills, and career paths
💬 **Conversation Context**: The chatbot maintains conversation history
🎨 **Beautiful UI**: Modern, responsive chat interface with smooth animations
📱 **Mobile Friendly**: Works seamlessly on all devices

## How to Use

1. **Login to Your Account**
   - Sign up or log in to access the chatbot

2. **Navigate to AI Chat**
   - Click the "🤖 AI Chat" button in the navbar

3. **Start Chatting**
   - Type your question about courses, jobs, or careers
   - Wait for the AI to respond
   - Continue the conversation

## Example Questions
- "What courses are available for web development?"
- "What skills do I need for a junior developer job?"
- "How can I improve my programming skills?"
- "Tell me about career opportunities in AI"
- "What's the best path to become a full-stack developer?"

## API Endpoints

### Chat Endpoint
- **URL**: `POST http://localhost:5001/chat`
- **Payload**:
```json
{
  "message": "Your question here"
}
```
- **Response**:
```json
{
  "response": "AI response here",
  "timestamp": "2024-12-18T10:30:00.000Z"
}
```

### Health Check
- **URL**: `GET http://localhost:5001/health`
- **Response**:
```json
{
  "status": "running",
  "message": "Chatbot service is healthy"
}
```

## Troubleshooting

### Chatbot Server Not Running
- Make sure you have Python 3.8+ installed
- Install required packages: `pip install -r requirements.txt`
- Run the server: `python backend/chatbot_server.py`

### API Key Issues
- Verify the API key in `backend/.env` is correct
- Check that you have Google Generative AI API enabled

### Connection Errors
- Ensure the frontend is pointing to `http://localhost:5001`
- Check that both servers are running (Node.js and Python)
- Verify no port conflicts exist

## Security Notes
⚠️ **Important**: 
- Never commit the API key to version control
- Use environment variables for production
- Consider implementing rate limiting for production use
- Add authentication middleware for API endpoints

## Future Enhancements
- [ ] Conversation history storage
- [ ] Multiple conversation threads
- [ ] Export chat as PDF
- [ ] User feedback ratings
- [ ] Analytics dashboard
- [ ] Response caching
