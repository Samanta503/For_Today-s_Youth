# For Today's Youth - Frontend

Career guidance platform built with React 19, Vite, Tailwind CSS, and Firebase.

## Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Navigate to frontend directory:
```bash
cd for_today's_youth
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with Firebase credentials:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_API_URL=http://localhost:5000
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── JobCard.jsx
│   ├── SkillCard.jsx
│   ├── CourseCard.jsx
│   └── FeatureCard.jsx
│
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── SignUpPage.jsx
│   ├── DashboardPage.jsx
│   ├── ProfilePage.jsx
│   ├── JobsPage.jsx
│   ├── SkillsPage.jsx
│   └── CoursesPage.jsx
│
├── services/
│   ├── firebaseConfig.js
│   ├── authService.js
│   ├── userService.js
│   ├── jobService.js
│   ├── skillService.js
│   └── courseService.js
│
├── context/
│   └── AuthContext.jsx
│
├── hooks/
│   └── useAuth.js
│
├── utils/
│   ├── constants.js
│   ├── jobRecommendation.js
│   ├── skillMatcher.js
│   ├── validators.js
│   └── helpers.js
│
├── styles/
│   ├── globals.css
│   └── variables.css
│
├── App.jsx
└── main.jsx
```

## Pages

### Landing Page (`/`)
- Hero section with CTA buttons
- Features overview
- Benefits showcase
- Call-to-action

### Authentication Pages
- **Login** (`/login`) - User login form
- **Sign Up** (`/signup`) - Registration with education level selection

### Dashboard (`/dashboard`)
- User profile overview
- Quick stats
- Recent recommendations
- Navigation to other sections

### Profile Page (`/profile`)
- User qualification entry
- Education level selection
- Experience tracking
- Skills management
- Career interests

### Jobs Page (`/jobs`)
- Job recommendations
- Filter and search
- Job details view
- Application links

### Skills Page (`/skills`)
- Skill suggestions
- Skill difficulty levels
- Learning timeline
- Priority ranking

### Courses Page (`/courses`)
- Course recommendations
- Internal courses
- External course links
- Progress tracking

## Features

### Authentication
- Email/password registration
- Email/password login
- Password reset
- User profile creation

### Job Recommendations
- Personalized job matching
- Match percentage scoring
- Skill requirement display
- Salary and location info

### Skill Analysis
- Missing skill identification
- Difficulty levels
- Learning time estimates
- Priority ranking

### Course Finder
- Internal course library
- External course links from:
  - Udemy
  - Coursera
  - Google Learning
  - YouTube
  - LinkedIn Learning

## Styling

The project uses Tailwind CSS for styling with custom utilities.

## Technologies

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Firebase** - Authentication & Database
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## License

MIT
