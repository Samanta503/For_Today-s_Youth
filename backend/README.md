# For Today's Youth - Backend API

Backend server for the For Today's Youth career guidance platform built with Node.js and Express.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with Firebase credentials:
```
PORT=5000
NODE_ENV=development
DATABASE_URL=your_firebase_database_url
FIREBASE_ADMIN_SDK=your_firebase_admin_json
```

3. Start development server:
```bash
npm run dev
```

## API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs/search` - Search jobs

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/by-skill/:skill` - Get courses by skill
- `POST /api/courses/search` - Search courses

### Recommendations
- `POST /api/recommendations/generate` - Generate user recommendations

### Health
- `GET /api/health` - Health check

## Project Structure

```
src/
├── config/
│   └── firebase.js
├── utils/
│   ├── sampleData.js
│   ├── jobMatcher.js
│   ├── skillAnalyzer.js
│   ├── courseRecommender.js
│   └── recommendationEngine.js
└── server.js
```

## Technologies

- Express.js - Web framework
- Firebase Admin SDK - Database
- CORS - Cross-origin resource sharing
- Dotenv - Environment variables

## Features

- Job recommendations based on user skills and education
- Skill gap analysis
- Course recommendations (internal and external)
- Search functionality for jobs and courses
- Comprehensive recommendation engine
