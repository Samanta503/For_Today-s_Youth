# AI Chatbot Backend

This is the Python FastAPI backend for the "For Today's Youth" AI Chatbot.

## Features

- Powered by Google's Gemini AI API
- Multi-turn conversation support
- Career and course guidance
- Job opportunity recommendations
- CORS enabled for frontend integration

## Setup Instructions

### 1. Install Python (if not already installed)
- Download from https://www.python.org/downloads/
- Make sure to add Python to PATH during installation

### 2. Navigate to chatbot_backend directory
```bash
cd chatbot_backend
```

### 3. Create a Virtual Environment (Optional but recommended)
```bash
python -m venv venv
```

Activate it:
- **Windows (PowerShell)**:
  ```bash
  .\venv\Scripts\Activate.ps1
  ```
- **Windows (Command Prompt)**:
  ```bash
  venv\Scripts\activate.bat
  ```
- **Mac/Linux**:
  ```bash
  source venv/bin/activate
  ```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Configure API Key
The `.env` file already has the Google API key configured. If you need to change it:
1. Open `.env`
2. Update `GOOGLE_API_KEY` with your own key from Google Cloud Console

### 6. Run the Server
```bash
python main.py
```

The server will start on `http://localhost:5001`

## API Endpoints

### GET `/`
- Health check endpoint
- Returns: `{"message": "AI Chatbot Server is running"}`

### POST `/chat`
- Send a message to the chatbot
- Request body:
  ```json
  {
    "message": "Tell me about web development courses"
  }
  ```
- Response:
  ```json
  {
    "response": "AI response text here"
  }
  ```

### POST `/reset`
- Reset conversation history
- Returns: `{"message": "Conversation history cleared"}`

## Troubleshooting

### Port 5001 already in use
If port 5001 is already in use, you can modify the port in `main.py`:
```python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=YOUR_PORT_NUMBER)
```

### API Key Issues
If you get API key errors:
1. Verify the API key in `.env`
2. Check that the Google Generative AI API is enabled in Google Cloud Console
3. Make sure you have sufficient quota

### Connection Refused
Make sure the chatbot backend is running before trying to use the chatbot from the frontend.

## Frontend Integration

The React frontend connects to this backend at `http://localhost:5001`. Make sure both services are running:
1. Chatbot Backend: `python main.py` (port 5001)
2. React Frontend: `npm run dev` (usually port 5173)

## Development

To modify the chatbot behavior, edit the `system_instruction` in the `/chat` endpoint in `main.py`.
