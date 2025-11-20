# For Today's Youth - Career Guidance Platform

A comprehensive MERN (MongoDB/Firebase, Express, React, Node.js) web application that provides personalized career guidance, job recommendations, skill development suggestions, and course recommendations for youth.

## 🎯 Project Overview

**For Today's Youth** is a career guidance platform designed to:
- Match users with suitable job opportunities based on their qualifications
- Identify skill gaps and suggest improvements
- Recommend relevant courses for skill development
- Provide external course links when internal options aren't available
- Track user progress and career readiness

## ✨ Key Features

### 1. **Personalized Career Guidance**
- Analyze user education, experience, and skills
- Generate matching job opportunities (150+ curated jobs)
- Provide match scores and suitability percentages

### 2. **Job Recommendations**
- Personalized job matching algorithm
- Filter by location, salary, and skills
- Direct application links
- Skill requirements display

### 3. **Skill Gap Analysis**
- Identify missing skills for target roles
- Priority-based skill suggestions
- Learning time estimates
- Difficulty levels

### 4. **Course Recommendations**
- 50+ curated internal courses
- External course links from:
  - Google Learning
  - Coursera
  - Udemy
  - LinkedIn Learning
  - YouTube

### 5. **User Dashboard**
- Profile management
- Qualification tracking
- Progress monitoring
- Recommended actions

## 🏗️ Architecture

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Firebase Admin SDK
- **APIs**: RESTful
- **Features**: Job matching, skill analysis, course recommendations

## 📁 Project Structure

```
For_Today-s_Youth/
│
├── for_today's_youth/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                    # Backend (Node + Express)
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
└── PROJECT_ROADMAP.md          # Detailed development roadmap
```

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ (with npm)
- Firebase project credentials
- Git

### Frontend Setup

```bash
# Navigate to frontend directory
cd for_today's_youth

# Install dependencies
npm install

# Create .env file with Firebase credentials
cp .env.example .env
# Edit .env with your Firebase config

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Firebase admin config

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

## 📋 Environment Variables

### Frontend (.env)
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_DATABASE_URL=
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DATABASE_URL=
FIREBASE_ADMIN_SDK={}
```

## 🎨 Pages & Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/signup` - User registration

### Protected Routes (Requires Authentication)
- `/dashboard` - Main user dashboard
- `/profile` - User profile & qualifications
- `/jobs` - Job recommendations
- `/skills` - Skill suggestions
- `/courses` - Course recommendations

## 🔧 API Endpoints

### Base URL: `http://localhost:5000/api`

#### Jobs
- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get specific job
- `POST /jobs/search` - Search jobs

#### Skills
- `GET /skills` - Get all skills
- `GET /skills/:id` - Get specific skill

#### Courses
- `GET /courses` - Get all courses
- `GET /courses/by-skill/:skill` - Get courses by skill
- `POST /courses/search` - Search courses

#### Recommendations
- `POST /recommendations/generate` - Generate personalized recommendations

#### Health Check
- `GET /health` - API status

## 🧮 Algorithms

### 1. Job Matching Algorithm
```
Score = (Education Match × 30%) + (Skill Match × 40%) + (Experience Match × 30%)
- Education must meet minimum requirements
- Skill match based on overlap
- Experience considered
- Final match percentage calculated
```

### 2. Skill Gap Analysis
```
For each target job:
1. Extract required skills
2. Compare with user's current skills
3. Calculate skill gaps
4. Prioritize by job market demand
5. Estimate learning time
```

### 3. Course Recommendation
```
For each missing skill:
1. Search internal course database
2. If found → Recommend with priority
3. If not found → Fetch external courses
4. Rank by provider reliability
5. Include pricing and duration
```

## 📊 Database Schema

### Users Collection
```javascript
{
  uid: string,
  email: string,
  fullName: string,
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

### Jobs Reference
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
  description: string
}
```

## 🎓 Technologies Used

### Frontend
- React 19
- Vite
- Tailwind CSS
- Firebase Authentication
- Firestore Database
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- CORS
- Express Validator
- JWT
- Bcryptjs

## 📈 Development Phases

### Phase 1: ✅ Setup & Infrastructure
- [x] Project structure creation
- [x] Dependency installation
- [x] Tailwind CSS configuration
- [x] Firebase setup

### Phase 2: ✅ Frontend Basics
- [x] Navbar & Footer components
- [x] Landing page with energy usage theme
- [x] Login & Sign Up pages
- [x] Auth context setup
- [x] Routing structure

### Phase 3: 🔄 Core Features (In Progress)
- [ ] Dashboard page
- [ ] Profile/Qualifications page
- [ ] Jobs recommendation page
- [ ] Skills suggestion page
- [ ] Courses recommendation page

### Phase 4: Backend Services
- [x] Express server setup
- [x] Sample data integration
- [x] Job matching algorithm
- [x] Skill analyzer
- [x] Course recommender
- [ ] User API routes
- [ ] Database integration

### Phase 5: Integration & Testing
- [ ] Frontend-Backend API integration
- [ ] User testing
- [ ] Performance optimization
- [ ] Security hardening

### Phase 6: Deployment
- [ ] Frontend deployment (Vercel)
- [ ] Backend deployment (Heroku/Firebase)
- [ ] Database setup
- [ ] Domain configuration

## 🔐 Security Features

- Firebase Authentication (Email/Password)
- Input validation and sanitization
- CORS protection
- Environment variables for sensitive data
- JWT token support
- Password hashing (bcryptjs)

## 🎨 UI/UX Design

### Design Theme
- **Color Scheme**: Sky blue (#0ea5e9) with dark accents
- **Inspired by**: Energy usage dashboard from attached image
- **Typography**: Clean, modern fonts
- **Responsive**: Mobile-first design

### Key Components
- Hero sections with gradient backgrounds
- Card-based layouts
- Smooth transitions and animations
- Loading skeletons
- Toast notifications
- Modal dialogs

## 📱 Responsive Design

- **Mobile**: Full optimization for small screens
- **Tablet**: Adjusted layouts for medium screens
- **Desktop**: Full feature utilization

## 🚀 Performance Optimizations

- Code splitting for routes
- Image optimization
- CSS minification via Tailwind
- Firebase caching
- Lazy loading components

## 🧪 Testing

(To be implemented)
- Unit tests with Jest
- Component tests with React Testing Library
- API integration tests
- E2E tests with Cypress

## 📚 Documentation

- `PROJECT_ROADMAP.md` - Detailed development roadmap
- `for_today's_youth/README.md` - Frontend documentation
- `backend/README.md` - Backend documentation

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📞 Support & Contact

- **Email**: info@fortodaysyouth.com
- **Website**: (coming soon)
- **Issues**: Please create a GitHub issue

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Firebase team for excellent backend services
- React community for amazing tools
- Tailwind CSS for utility-first styling
- All contributors and supporters

---

**Current Status**: 🚀 In Active Development

**Last Updated**: November 20, 2025

For the complete development roadmap and feature breakdown, see `PROJECT_ROADMAP.md`
