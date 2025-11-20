# For Today's Youth - MERN Project Roadmap

## Project Overview
A full-stack career guidance platform that helps youth find suitable jobs based on their qualifications, suggests required skills for career advancement, recommends courses for skill development, and provides external resources when internal courses aren't available.

---

## Technology Stack
- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Backend**: Node.js & Express.js
- **Database**: Firebase (Realtime Database & Firestore)
- **Authentication**: Firebase Authentication
- **Routing**: React Router v6

---

## Project Structure

```
For_Today-s_Youth/
├── for_today's_youth/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/             # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── SkillCard.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   └── Loading.jsx
│   │   │
│   │   ├── pages/                  # Page components
│   │   │   ├── LandingPage.jsx     # Hero, features, CTA
│   │   │   ├── LoginPage.jsx       # User login form
│   │   │   ├── SignUpPage.jsx      # User registration form
│   │   │   ├── DashboardPage.jsx   # Main user dashboard
│   │   │   ├── ProfilePage.jsx     # User profile & qualification entry
│   │   │   ├── JobsPage.jsx        # Job recommendations
│   │   │   ├── SkillsPage.jsx      # Skill suggestions
│   │   │   ├── CoursesPage.jsx     # Course recommendations
│   │   │   └── NotFound.jsx        # 404 page
│   │   │
│   │   ├── services/               # API & Firebase services
│   │   │   ├── firebaseConfig.js   # Firebase initialization
│   │   │   ├── authService.js      # Authentication logic
│   │   │   ├── userService.js      # User CRUD operations
│   │   │   ├── jobService.js       # Job recommendations
│   │   │   ├── skillService.js     # Skill suggestions
│   │   │   ├── courseService.js    # Course recommendations
│   │   │   └── apiService.js       # Backend API calls
│   │   │
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useAuth.js          # Authentication hook
│   │   │   ├── useUser.js          # User data hook
│   │   │   ├── useFetch.js         # Data fetching hook
│   │   │   └── useLocalStorage.js  # Local storage hook
│   │   │
│   │   ├── context/                # React Context
│   │   │   ├── AuthContext.jsx     # Auth state management
│   │   │   └── UserContext.jsx     # User state management
│   │   │
│   │   ├── utils/                  # Utility functions
│   │   │   ├── constants.js        # App constants
│   │   │   ├── jobRecommendation.js # Job matching algorithm
│   │   │   ├── skillMatcher.js     # Skill matching logic
│   │   │   ├── validators.js       # Form validators
│   │   │   └── helpers.js          # Helper functions
│   │   │
│   │   ├── styles/                 # Global styles
│   │   │   ├── tailwind.config.js
│   │   │   ├── globals.css
│   │   │   └── variables.css
│   │   │
│   │   ├── App.jsx                 # Main app component with routing
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/                     # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.html
│
└── backend/                        # Backend (Node.js + Express)
    ├── src/
    │   ├── config/
    │   │   ├── firebase.js         # Firebase admin config
    │   │   ├── database.js         # Database connection
    │   │   └── dotenv.js           # Environment variables
    │   │
    │   ├── routes/
    │   │   ├── auth.js             # Authentication routes
    │   │   ├── users.js            # User management routes
    │   │   ├── jobs.js             # Job recommendation routes
    │   │   ├── skills.js           # Skill suggestion routes
    │   │   ├── courses.js          # Course recommendation routes
    │   │   └── recommendations.js  # Main recommendation engine
    │   │
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── userController.js
    │   │   ├── jobController.js
    │   │   ├── skillController.js
    │   │   ├── courseController.js
    │   │   └── recommendationController.js
    │   │
    │   ├── models/
    │   │   ├── User.js             # User schema/model
    │   │   ├── Job.js              # Job schema/model
    │   │   ├── Skill.js            # Skill schema/model
    │   │   ├── Course.js           # Course schema/model
    │   │   └── Recommendation.js   # Recommendation schema/model
    │   │
    │   ├── middleware/
    │   │   ├── auth.js             # Authentication middleware
    │   │   ├── errorHandler.js     # Error handling
    │   │   └── validator.js        # Input validation
    │   │
    │   ├── utils/
    │   │   ├── jobMatcher.js       # Job matching algorithm
    │   │   ├── skillAnalyzer.js    # Skill analysis logic
    │   │   ├── courseRecommender.js # Course recommendation logic
    │   │   ├── externalCourses.js  # External course fetcher (Google, Coursera, etc.)
    │   │   └── logger.js           # Logging utility
    │   │
    │   └── server.js               # Main server file
    │
    ├── .env.example
    ├── .env
    ├── .gitignore
    ├── package.json
    └── README.md
```

---

## Feature Breakdown

### 1. **Landing Page** (`LandingPage.jsx`)
- Hero section with project title and CTA buttons
- Features overview section
- Call-to-action for signup/login
- Maintain given UI design (energy usage card theme)
- Responsive navigation

### 2. **Authentication Pages**
- **LoginPage.jsx**: Email/password login form
- **SignUpPage.jsx**: User registration with initial qualification selection
- Firebase authentication integration
- Form validation and error handling

### 3. **Dashboard** (`DashboardPage.jsx`)
Central hub showing:
- User greeting with profile picture
- Quick stats (jobs found, skills to develop, courses available)
- Recent recommendations
- Navigation to Jobs, Skills, Courses sections

### 4. **Profile Page** (`ProfilePage.jsx`)
User qualification entry:
- Education level (10th, 12th, Diploma, Bachelor's, Master's, PhD)
- Field of study
- Work experience (years)
- Current skills
- Career interests
- Save profile to Firebase

### 5. **Jobs Page** (`JobsPage.jsx`)
- Display job recommendations based on user qualifications
- Job cards with title, company, salary, location, requirements
- Filter and search functionality
- Link to job applications

### 6. **Skills Page** (`SkillsPage.jsx`)
- Suggest missing skills for desired roles
- Skill difficulty levels
- Timeline to learn each skill
- Priority ranking

### 7. **Courses Page** (`CoursesPage.jsx`)
- Internal course recommendations
- If unavailable, provide external links:
  - Google Learning
  - Coursera
  - Udemy
  - LinkedIn Learning
  - YouTube tutorials
- Course cards with duration, level, provider info

---

## Backend API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh-token` - Refresh authentication token

### User Routes (`/api/users`)
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile
- `POST /users/:id/qualifications` - Save user qualifications
- `GET /users/:id/recommendations` - Get all recommendations

### Job Routes (`/api/jobs`)
- `GET /jobs` - Get all jobs
- `GET /jobs/recommended/:userId` - Get personalized job recommendations
- `POST /jobs/search` - Search jobs by criteria
- `GET /jobs/:id` - Get job details

### Skill Routes (`/api/skills`)
- `GET /skills` - Get all skills
- `POST /skills/suggest/:userId` - Get skill suggestions for user
- `GET /skills/by-job/:jobId` - Get skills required for a job
- `POST /skills/gap-analysis` - Analyze skill gaps

### Course Routes (`/api/courses`)
- `GET /courses` - Get all internal courses
- `GET /courses/recommended/:userId` - Get recommended courses
- `POST /courses/search` - Search courses by topic/skill
- `GET /courses/external` - Get external course links

### Recommendation Routes (`/api/recommendations`)
- `POST /recommendations/generate/:userId` - Generate complete recommendations
- `GET /recommendations/:userId` - Get user recommendations history

---

## Core Algorithms

### 1. **Job Recommendation Algorithm** (`jobRecommendation.js`)
```
Match user's:
- Education level → Job requirements
- Skills → Required skills
- Experience → Minimum years needed
Score each job and rank by match percentage
```

### 2. **Skill Suggestion Logic** (`skillMatcher.js`)
```
For target job:
- Extract required skills
- Compare with user's current skills
- Identify gap
- Prioritize by importance
```

### 3. **Course Recommendation** (`courseRecommender.js`)
```
For suggested skills:
- Search internal courses database
- If found → Recommend with priority
- If not found → Fetch external courses via APIs
```

### 4. **External Course Fetcher** (`externalCourses.js`)
```
- Coursera API
- Google Courses API
- YouTube Search API
- Udemy API (if available)
- Fallback: Direct search links
```

---

## Database Structure (Firebase)

### Collections/References

**Users Collection**
```javascript
{
  userId: string,
  email: string,
  name: string,
  profilePic: string,
  education: {
    level: string,
    field: string,
    yearOfPassing: number
  },
  experience: {
    yearsOfExperience: number,
    roles: array
  },
  skills: array,
  interests: array,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Jobs Reference**
```javascript
{
  jobId: string,
  title: string,
  company: string,
  salary: string,
  location: string,
  requiredEducation: string,
  requiredSkills: array,
  minExperience: number,
  description: string,
  link: string
}
```

**Skills Reference**
```javascript
{
  skillId: string,
  name: string,
  category: string,
  difficulty: string,
  learningTime: number (in hours),
  relatedJobs: array,
  courseId: array
}
```

**Courses Collection**
```javascript
{
  courseId: string,
  title: string,
  provider: string (internal/coursera/udemy/etc),
  skillTaught: string,
  duration: number (in hours),
  level: string,
  link: string,
  internalContent: boolean,
  price: number
}
```

---

## Development Phases

### Phase 1: Setup & Infrastructure
- [ ] Install all dependencies (Tailwind, Firebase, Router, etc.)
- [ ] Configure Tailwind CSS
- [ ] Setup Firebase config
- [ ] Create folder structure
- [ ] Setup routing structure

### Phase 2: Authentication & UI
- [ ] Create Navbar & Footer components
- [ ] Build Landing Page
- [ ] Build Login/Sign Up Pages
- [ ] Setup Firebase Authentication
- [ ] Create Auth Context

### Phase 3: Core Dashboard
- [ ] Build Dashboard Page
- [ ] Build Profile Page (qualification entry)
- [ ] Create Job Card component
- [ ] Create Skill Card component
- [ ] Create Course Card component

### Phase 4: Backend APIs
- [ ] Setup Express server
- [ ] Create authentication routes
- [ ] Create user management routes
- [ ] Create job recommendation engine
- [ ] Create skill suggestion system

### Phase 5: Recommendations Engine
- [ ] Build Jobs recommendation page
- [ ] Build Skills suggestion page
- [ ] Build Courses recommendation page
- [ ] Integrate external course APIs
- [ ] Implement matching algorithms

### Phase 6: Polish & Deploy
- [ ] Add error handling
- [ ] Implement loading states
- [ ] Add responsive design refinements
- [ ] Testing
- [ ] Deploy to Vercel (Frontend) & Firebase/Heroku (Backend)

---

## Environment Variables (.env)

### Frontend
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend
```
PORT=5000
NODE_ENV=development
FIREBASE_ADMIN_SDK_PATH=./firebase-admin.json
DATABASE_URL=your_firebase_url
API_KEY=your_secret_key
COURSERA_API_KEY=your_key
UDEMY_API_KEY=your_key
YOUTUBE_API_KEY=your_key
```

---

## Dependencies to Install

### Frontend
```
react-router-dom
firebase
axios
tailwindcss
postcss
autoprefixer
date-fns
react-hot-toast
zustand (for state management)
```

### Backend
```
express
dotenv
cors
firebase-admin
axios
express-validator
jsonwebtoken
bcryptjs
```

---

## Key Files to Create

1. **Config Files**
   - `tailwind.config.js`
   - `postcss.config.js`
   - `firebaseConfig.js`
   - `.env`

2. **Service Files**
   - `authService.js`
   - `jobService.js`
   - `skillService.js`
   - `courseService.js`

3. **Hook Files**
   - `useAuth.js`
   - `useFetch.js`

4. **Utility Files**
   - `jobRecommendation.js`
   - `skillMatcher.js`
   - `validators.js`

---

## UI/UX Guidelines

- Maintain the energy usage card theme (dark blue, clean lines)
- Use Tailwind for consistent spacing and colors
- Responsive design (mobile, tablet, desktop)
- Loading skeletons for async operations
- Toast notifications for user feedback
- Smooth transitions and hover effects

---

## Next Steps

1. Install all dependencies
2. Setup Tailwind CSS
3. Create folder structure
4. Build core components (Navbar, Footer)
5. Build authentication pages
6. Integrate Firebase
7. Build recommendation engine
