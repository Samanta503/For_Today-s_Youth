from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal
from dotenv import load_dotenv
import os
from google import genai
import json
import hashlib
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Simple in-memory cache for responses
response_cache = {}
CACHE_TTL = 3600  # Cache for 1 hour

# Pre-canned responses for common questions (fallback when API quota exhausted)
FALLBACK_RESPONSES = {
    "top jobs": "🎯 **Top Jobs in 2025 for CSE Engineers:**\n\n1. **AI/ML Engineer** - High demand, 12-20 LPA starting\n2. **Cloud Architect** - AWS/Azure/GCP skills needed\n3. **Full-Stack Developer** - React, Node.js, MongoDB\n4. **DevOps Engineer** - Docker, Kubernetes, CI/CD\n5. **Data Engineer** - Big Data, Spark, Python\n6. **Cybersecurity Specialist** - 15-25 LPA\n7. **Backend Engineer** - Microservices, Databases\n\n💡 Recommendation: Start with our **Web Development** or **AI Engineering** courses!",
    
    "courses": "📚 **Available Courses:**\n\n1. **Web Development** - HTML, CSS, JavaScript, React, Node.js\n2. **AI Engineering** - Machine Learning, Deep Learning, NLP\n3. **Digital Marketing** - SEO, Social Media, Content Strategy\n4. **Entrepreneurship** - Business Planning, Startup Ideas\n5. **Competitive Programming** - DSA, Problem Solving\n6. **Data Science** - Python, Analytics, Visualization\n\n✨ Each course includes real-world projects and career guidance!",
    
    "career guidance": "🚀 **Career Guidance Tips:**\n\n1. **Start with Fundamentals** - Master DSA and Core Concepts\n2. **Build Projects** - Create 3-5 portfolio projects\n3. **Learn In-Demand Skills** - Web Dev, AI/ML, Cloud\n4. **Practice Coding** - Daily LeetCode/HackerRank problems\n5. **Networking** - Connect with seniors and mentors\n6. **Interview Prep** - Mock interviews, System Design\n7. **Continuous Learning** - Stay updated with trends\n\n💪 Consider our courses to accelerate your journey!",
    
    "skill": "🎓 **Skill Development Strategy:**\n\n**Must-Have Skills:**\n- Data Structures & Algorithms\n- Database Management (SQL)\n- Version Control (Git)\n- Web Technologies (HTML, CSS, JS)\n\n**Specialized Skills (Choose 1-2):**\n- Backend: Node.js, Django, Spring Boot\n- Frontend: React, Vue, Angular\n- Cloud: AWS, Azure, GCP\n- AI/ML: Python, TensorFlow, PyTorch\n\n**Soft Skills:**\n- Communication\n- Problem Solving\n- Leadership\n- Time Management\n\n🔥 Our courses teach both technical and soft skills!",
    
    "interview": "🎯 **Interview Preparation Guide:**\n\n**Technical Round (45 mins)**\n- 2-3 Coding Problems (Easy-Medium)\n- Data Structure Discussion\n- Algorithm Optimization\n\n**System Design (30 mins)**\n- Design a scalable system\n- Database choices\n- Trade-offs discussion\n\n**HR Round (15 mins)**\n- Tell me about yourself\n- Why this company?\n- Salary expectations\n\n**Pro Tips:**\n✓ Practice on LeetCode 500+ problems\n✓ Mock interviews with peers\n✓ Code clearly & explain your approach\n✓ Ask clarifying questions\n\n📖 Join our **Competitive Programming** course!",
    
    "web development": "💻 **Web Development Learning Path:**\n\n**Frontend (3 months):**\n- HTML5 & CSS3 Basics\n- JavaScript ES6+\n- React.js with Hooks\n- State Management (Redux)\n- Responsive Design & Tailwind\n\n**Backend (3 months):**\n- Node.js & Express.js\n- REST APIs & GraphQL\n- MongoDB & PostgreSQL\n- Authentication & Security\n- Deployment (Heroku, AWS)\n\n**Full Stack Project:**\n- Build 2-3 complete projects\n- Version control with Git\n- Deployment & DevOps basics\n\n🚀 Our Web Development course covers all this!",
    
    "ai engineering": "🤖 **AI/ML Engineering Roadmap:**\n\n**Phase 1: Fundamentals (2 months)**\n- Python Programming\n- Linear Algebra & Calculus\n- Statistics & Probability\n- NumPy, Pandas Basics\n\n**Phase 2: Machine Learning (3 months)**\n- Supervised Learning (Regression, Classification)\n- Unsupervised Learning (Clustering, Dimensionality)\n- Scikit-learn & Model Evaluation\n- Feature Engineering\n\n**Phase 3: Deep Learning (3 months)**\n- Neural Networks & CNNs\n- RNNs & Transformers\n- TensorFlow & PyTorch\n- NLP & Computer Vision\n\n**Projects:** 3-4 real-world ML projects\n\n🔬 Master AI with our AI Engineering course!",
    
    "digital marketing": "📱 **Digital Marketing Skills:**\n\n**SEO (Search Engine Optimization):**\n- Keyword Research\n- On-page & Off-page SEO\n- Technical SEO\n- Link Building\n\n**Social Media Marketing:**\n- Content Strategy\n- Community Management\n- Paid Ads (Facebook, Instagram, LinkedIn)\n- Analytics & Metrics\n\n**Content Marketing:**\n- Blogging & Copywriting\n- Email Marketing\n- Video Marketing\n- Storytelling\n\n**Tools:** Google Analytics, SEMrush, Hootsuite, Canva\n\n📈 Learn from our Digital Marketing course!",
    
    "entrepreneurship": "🚀 **Entrepreneurship Essentials:**\n\n**Step 1: Ideation**\n- Problem Identification\n- Market Research\n- Validation\n\n**Step 2: Planning**\n- Business Model Canvas\n- Financial Projections\n- Go-to-Market Strategy\n\n**Step 3: Execution**\n- MVP Development\n- Customer Acquisition\n- Scaling Strategies\n\n**Step 4: Funding**\n- Pitch Deck Preparation\n- Investor Outreach\n- Negotiation Skills\n\n**Resources:** Startup communities, accelerators, mentors\n\n💼 Build your startup with our Entrepreneurship course!",
    
    "competitive programming": "⚡ **Competitive Programming Mastery:**\n\n**Core DSA Topics:**\n- Arrays & Strings\n- Linked Lists & Trees\n- Graphs & Greedy Algorithms\n- Dynamic Programming\n- Recursion & Backtracking\n- Hashing & Sorting\n\n**Problem-Solving:**\n- LeetCode (500+ problems)\n- HackerRank & CodeChef\n- Codeforces Contests\n- Time Complexity Analysis\n\n**Interview Focus:**\n- Array manipulation\n- Tree traversals\n- Graph algorithms\n- DP problems\n- System design basics\n\n⭐ Recommended: Solve 2-3 problems daily\n\n🏆 Master DSA with our Competitive Programming course!",
    
    "database": "🗄️ **Database Skills You Need:**\n\n**SQL Databases:**\n- PostgreSQL & MySQL\n- CRUD Operations\n- Joins & Relationships\n- Indexing & Optimization\n- Transactions & ACID\n\n**NoSQL Databases:**\n- MongoDB & Firebase\n- Document-based Data\n- Scalability & Flexibility\n- Real-time Databases\n\n**Key Concepts:**\n- Schema Design\n- Query Optimization\n- Backup & Recovery\n- Database Security\n\n💡 Both SQL and NoSQL are essential!\n\n📚 Learn databases in our Web Development course!",
    
    "recommendation": "💡 **Personalized Recommendations:**\n\n**For Beginners:**\n→ Start with **Competitive Programming** (DSA fundamentals)\n→ Then **Web Development** (build real projects)\n→ Finally **AI Engineering** (advanced specialization)\n\n**For Job-Ready in 6 months:**\n→ **Web Development** (High demand, 25-40 LPA)\n→ Build 3 full-stack projects\n→ Interview prep with DSA focus\n\n**For High-Paying Roles (12+ LPA):**\n→ **AI Engineering** (12-20 LPA)\n→ **DevOps & Cloud** (15-25 LPA)\n→ **System Design Mastery**\n\n**Combination Strategy:**\n✓ Core: DSA & Web Fundamentals\n✓ Specialization: AI/ML or Cloud\n✓ Soft Skills: Communication & Leadership\n\n🎯 Our structured paths have 95% placement rate!",
    
    "salary": "💰 **Software Engineer Salary Guide (2025):**\n\n**By Experience Level (India):**\n- **Fresher/Entry-Level** - 4-8 LPA\n- **1-3 Years** - 8-15 LPA\n- **3-5 Years** - 15-25 LPA\n- **5-8 Years** - 25-40 LPA\n- **Senior/Lead** - 40-60+ LPA\n\n**By Specialization (5+ years):**\n- Full-Stack Developer - 20-35 LPA\n- **AI/ML Engineer** - 25-45 LPA ⭐\n- **Cloud Architect** - 30-50 LPA ⭐\n- DevOps Engineer - 25-40 LPA\n- Data Engineer - 22-38 LPA\n- Cybersecurity - 28-45 LPA\n\n**By Sector:**\n- FAANG (Google, Amazon, Meta) - 40-80 LPA\n- Startups - 8-30 LPA\n- Finance/Trading - 50-100+ LPA\n- Healthcare Tech - 18-35 LPA\n- E-commerce - 15-40 LPA\n\n**💡 Salary Negotiation Tips:**\n✓ Research market rates\n✓ Highlight your skills & projects\n✓ Negotiate base + bonus + stock options\n✓ Ask for professional development budget\n\n🎯 Higher salaries = Better skills + Right specialization!\n\n🚀 Our courses help you reach top-paying roles!",
}

def get_fallback_response(message: str) -> str | None:
    """Get fallback response based on keywords in message"""
    message_lower = message.lower()
    
    # Expanded keyword matching with more variations
    keyword_map = {
        # Top jobs variations (HIGHEST PRIORITY)
        ("top jobs", "job opportunities", "jobs for", "software engineer job", "job roles", "best jobs", "high paying", "highest salary", "2025 jobs", "career opportunities"): FALLBACK_RESPONSES["top jobs"],
        
        # Courses variations
        ("courses", "course", "what to learn", "learning path", "what course", "available courses", "enroll", "join", "take a course"): FALLBACK_RESPONSES["courses"],
        
        # Career guidance (CATCH MANY QUESTIONS)
        ("career", "guidance", "career path", "how to start", "roadmap", "full stack developer", "become", "future", "want to be"): FALLBACK_RESPONSES["career guidance"],
        
        # Salary/Compensation
        ("salary", "salaries", "compensation", "package", "earnings", "pay", "income", "how much", "salary in", "sectors", "different sectors", "earn"): FALLBACK_RESPONSES["salary"],
        
        # Skills
        ("skill", "required skill", "need to learn", "lacking", "requirement", "what skills", "must have", "essential"): FALLBACK_RESPONSES["skill"],
        
        # Interview
        ("interview", "interview prep", "prepare for", "coding round", "system design", "mock", "placement", "hiring"): FALLBACK_RESPONSES["interview"],
        
        # Web development
        ("web development", "web dev", "frontend", "backend", "full stack", "react", "node", "javascript", "html", "css"): FALLBACK_RESPONSES["web development"],
        
        # AI Engineering
        ("ai", "machine learning", "ml", "deep learning", "neural", "tensorflow", "pytorch", "python", "data science"): FALLBACK_RESPONSES["ai engineering"],
        
        # Digital Marketing
        ("marketing", "digital marketing", "seo", "social media", "content marketing", "advertising"): FALLBACK_RESPONSES["digital marketing"],
        
        # Entrepreneurship
        ("entrepreneurship", "startup", "business", "founder", "launch", "own business"): FALLBACK_RESPONSES["entrepreneurship"],
        
        # Competitive Programming
        ("competitive", "programming", "dsa", "algorithm", "leetcode", "coding problem", "coding", "codeforces"): FALLBACK_RESPONSES["competitive programming"],
        
        # Database
        ("database", "sql", "mongodb", "postgres", "nosql", "query", "data storage"): FALLBACK_RESPONSES["database"],
        
        # Recommendations
        ("recommend", "suggestion", "suggest", "which course", "should i", "best path", "right choice"): FALLBACK_RESPONSES["recommendation"],
    }
    
    # Check each keyword group (returns first match)
    for keywords, response in keyword_map.items():
        for keyword in keywords:
            if keyword in message_lower:
                return response
    
    # If no specific match, return a generic helpful response
    return """💡 **I can help you with:**\n\n✓ **Top jobs in 2025** - Salary, skills, demand\n✓ **Courses** - Web Dev, AI/ML, Digital Marketing, more\n✓ **Career Guidance** - How to become a full-stack dev, AI engineer, etc.\n✓ **Skills Needed** - For any role or specialization\n✓ **Interview Prep** - Questions, strategies, tips\n✓ **Salary & Compensation** - Entry to senior level, by sector\n✓ **Learning Paths** - Step-by-step roadmaps\n✓ **Recommendations** - Personalized course suggestions\n\n📝 Try asking: "Tell me about salary of software engineers" or "What skills do I need for web development?"\n\n🚀 Our For Today's Youth platform has complete courses with mentorship!"""

def get_cache_key(message: str) -> str:
    """Generate cache key from message"""
    return hashlib.md5(message.lower().strip().encode()).hexdigest()

def get_cached_response(message: str) -> str | None:
    """Get cached response if available and not expired"""
    key = get_cache_key(message)
    if key in response_cache:
        cached_data = response_cache[key]
        if datetime.now() < cached_data['expires']:
            return cached_data['response']
        else:
            del response_cache[key]
    return None

def cache_response(message: str, response: str):
    """Cache a response"""
    key = get_cache_key(message)
    response_cache[key] = {
        'response': response,
        'expires': datetime.now() + timedelta(seconds=CACHE_TTL)
    }

# Configure CORS middleware FIRST (before routes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Initialize Gemini client with API key
api_key = os.getenv("GOOGLE_API_KEY", "AIzaSyB6eaSC0FEaX3bBJq0nn_FcsMc37TG1Knk")
client = genai.Client(api_key=api_key)

# Model configuration
MODEL_NAME = "gemini-2.0-flash"

# Pydantic models
class Message(BaseModel):
    role: Literal["user", "model"]
    content: str

class ChatRequest(BaseModel):
    message: str
    history: list[Message] = []

class ChatResponse(BaseModel):
    reply: str

@app.get("/")
async def root():
    return {"message": "Gemini Chatbot API is running on port 5001", "status": "operational"}

@app.get("/health")
async def health():
    return {"status": "ok", "model": MODEL_NAME}

@app.options("/chat")
async def options_chat():
    return {"message": "OK"}

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        # Check cache first for exact message match
        cached_reply = get_cached_response(req.message)
        if cached_reply:
            print(f"📦 Cache hit for: {req.message[:50]}...")
            return ChatResponse(reply=cached_reply)
        
        # Check for fallback response (keyword matching)
        fallback_reply = get_fallback_response(req.message)
        if fallback_reply:
            print(f"🎯 Fallback response for: {req.message[:50]}...")
            cache_response(req.message, fallback_reply)
            return ChatResponse(reply=fallback_reply)
        
        # System instruction for the chatbot
        system_instruction = """You are an AI Assistant for 'For Today's Youth' platform. 
You help users with:
- Information about courses (Web Development, AI Engineering, Digital Marketing, Entrepreneurship, Competitive Programming, etc.)
- Job opportunities and career guidance
- Skill development recommendations
- Interview preparation
- Tech career advice

Be helpful, professional, and concise in your responses (max 300 words).
Always relate your answers to career development and the courses/jobs available on the platform."""
        
        # Build contents list for Gemini API using new client
        contents = []
        
        # Add conversation history
        for item in req.history:
            contents.append({
                "role": item.role,
                "parts": [{"text": item.content}]
            })
        
        # Add current user message
        contents.append({
            "role": "user",
            "parts": [{"text": req.message}]
        })
        
        # Try API call (may fail if quota exhausted)
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=contents,
                config={
                    "system_instruction": system_instruction,
                }
            )
            
            # Extract reply text from response
            reply_text = response.text.strip() if response and hasattr(response, 'text') else ""
            
            if not reply_text:
                reply_text = "I'm sorry, I couldn't generate a response. Please try again."
            
            # Cache the response
            cache_response(req.message, reply_text)
            
            return ChatResponse(reply=reply_text)
        
        except Exception as api_error:
            api_error_str = str(api_error)
            print(f"API Error: {api_error_str[:100]}")
            
            # If API fails due to quota, provide helpful message
            if "429" in api_error_str or "quota" in api_error_str.lower() or "resource_exhausted" in api_error_str.lower():
                fallback_msg = """⏳ **API Quota Temporarily Exceeded**\n\nThe Gemini API is currently experiencing high demand. However, I can still help you!\n\n**Try asking about:**\n- Top jobs in 2025\n- Available courses\n- Career guidance\n- Interview preparation\n- Skill development\n- Web development\n- AI engineering\n\nOr check back in a few minutes! 🚀"""
                return ChatResponse(reply=fallback_msg)
            else:
                raise
    
    except Exception as e:
        error_message = str(e)
        print(f"Chat Error: {error_message}")
        
        return ChatResponse(
            reply=f"Sorry, I encountered an error. Please try again later or ask about our courses and jobs!"
        )

@app.post("/reset")
async def reset():
    """Reset conversation history"""
    return {"message": "Conversation history cleared"}

if __name__ == "__main__":
    import uvicorn
    print(f"🤖 Starting AI Chatbot Server on http://0.0.0.0:5001")
    print(f"📡 Using model: {MODEL_NAME}")
    print(f"🔑 API Key configured: {api_key[:10]}...")
    uvicorn.run(app, host="0.0.0.0", port=5001)
