# For Today's Youth - Quick Reference Guide

## 🚀 Quick Start (2 Minutes)

### Terminal 1: Frontend
```bash
cd for_today's_youth
npm install
npm run dev
# Visit: http://localhost:5173
```

### Terminal 2: Backend
```bash
cd backend
npm install
npm run dev
# API running: http://localhost:5000
```

---

## 📚 Key Files Reference

| Purpose | File Location | Status |
|---------|--------------|--------|
| Landing Page | `for_today's_youth/src/pages/LandingPage.jsx` | ✅ Ready |
| Login | `for_today's_youth/src/pages/LoginPage.jsx` | ✅ Ready |
| Sign Up | `for_today's_youth/src/pages/SignUpPage.jsx` | ✅ Ready |
| Auth Logic | `for_today's_youth/src/services/authService.js` | ✅ Ready |
| Firebase Config | `for_today's_youth/src/config/firebaseConfig.js` | ✅ Ready |
| Routing | `for_today's_youth/src/App.jsx` | ✅ Ready |
| Backend Server | `backend/src/server.js` | ✅ Ready |
| Job Matcher | `backend/src/utils/jobMatcher.js` | ✅ Ready |
| Skill Analyzer | `backend/src/utils/skillAnalyzer.js` | ✅ Ready |
| Course Recommender | `backend/src/utils/courseRecommender.js` | ✅ Ready |

---

## 🔌 API Endpoints

```
GET    /api/health                  - API status
GET    /api/jobs                    - All jobs
GET    /api/jobs/:id                - Specific job
POST   /api/jobs/search             - Search jobs
GET    /api/skills                  - All skills
GET    /api/skills/:id              - Specific skill
GET    /api/courses                 - All courses
GET    /api/courses/by-skill/:skill - Courses by skill
POST   /api/courses/search          - Search courses
POST   /api/recommendations/generate - Generate recommendations
```

---

## 🎨 UI Features

| Component | File | Status |
|-----------|------|--------|
| Navigation | `components/Navbar.jsx` | ✅ Complete |
| Footer | `components/Footer.jsx` | ✅ Complete |
| Landing | `pages/LandingPage.jsx` | ✅ Complete |
| Auth Forms | `pages/LoginPage.jsx`, `SignUpPage.jsx` | ✅ Complete |
| Dashboard | `pages/DashboardPage.jsx` | 🔲 Placeholder |
| Profile | `pages/ProfilePage.jsx` | 🔲 Placeholder |
| Jobs | `pages/JobsPage.jsx` | 🔲 Placeholder |
| Skills | `pages/SkillsPage.jsx` | 🔲 Placeholder |
| Courses | `pages/CoursesPage.jsx` | 🔲 Placeholder |

---

## 📝 Configuration Steps

### Step 1: Firebase Setup
```
1. Go to firebase.google.com
2. Create new project
3. Enable Firestore Database
4. Enable Authentication
5. Copy credentials to .env
```

### Step 2: Frontend Config
```bash
cd for_today's_youth
cp .env.example .env
# Edit .env with Firebase credentials
npm install
npm run dev
```

### Step 3: Backend Config
```bash
cd ../backend
cp .env.example .env
# Edit .env with Firebase Admin SDK
npm install
npm run dev
```

---

## 🧪 Test The Application

### Test Landing Page
- Open: http://localhost:5173
- Should see beautiful energy dashboard theme

### Test Sign Up
- Click "Sign Up" button
- Fill form with details
- Should create new user in Firebase

### Test Login
- Click "Login" button
- Use registered credentials
- Should authenticate and redirect

### Test API
- Open: http://localhost:5000/api/health
- Should return: `{ success: true, message: "API is running" }`

---

## 🔐 Environment Variables Needed

### Firebase (Get from Firebase Console)
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_DATABASE_URL
```

### Backend
```
PORT=5000
NODE_ENV=development
DATABASE_URL=<your_firebase_database_url>
```

---

## 💻 Common Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
npm run lint     # Run linter
```

### Backend
```bash
npm run dev      # Start server
npm start        # Start production
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'react-router-dom'"
**Solution**: `cd for_today's_youth && npm install`

### Issue: Firebase not connecting
**Solution**: Check `.env` file has all credentials, restart dev server

### Issue: Port 5000 already in use
**Solution**: `npm run dev -- --port 5001` or kill process on port 5000

### Issue: Tailwind CSS not working
**Solution**: Run `npm install` again, clear browser cache

---

## 📊 Data Available

### Sample Jobs (6 total)
- Junior Web Developer
- Full Stack Developer
- Data Analyst
- UX/UI Designer
- Digital Marketing Executive
- Python Developer

### Sample Skills (6 total)
- JavaScript, React, Node.js, Python, Machine Learning, UI/UX Design

### Sample Courses (5 total)
- JavaScript Basics
- React for Beginners
- Node.js & Express
- Python for Data Science
- Complete Web Design

---

## 🎓 Next Steps to Build

### High Priority
1. Create Dashboard page
2. Create Profile page for qualifications
3. Connect to backend API
4. Implement job recommendations display

### Medium Priority
1. Create Jobs/Skills/Courses pages
2. Add filtering and search
3. Implement progress tracking

### Polish
1. Add more sample data
2. Implement real Firebase data
3. Deploy to production

---

## 📖 Documentation Files

| File | Content |
|------|---------|
| `README.md` | Project overview |
| `PROJECT_ROADMAP.md` | Complete feature list |
| `SETUP_GUIDE.md` | Setup instructions |
| `FILE_STRUCTURE.md` | All file locations |
| `COMPLETION_SUMMARY.md` | What's built |
| `for_today's_youth/README.md` | Frontend docs |
| `backend/README.md` | Backend docs |

---

## 🎯 Recommended Development Order

1. **Test Authentication** ✅ (Already built)
2. **Build Dashboard** - Show user info and stats
3. **Build Profile** - Let users enter qualifications
4. **Connect to API** - Fetch recommendations
5. **Build Recommendation Pages** - Display jobs/skills/courses
6. **Add Filtering** - Search and filter options
7. **Deploy** - Push to production

---

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Express.js Documentation](https://expressjs.com)

---

## 💡 Pro Tips

1. Use Chrome DevTools for debugging
2. Enable React Developer Tools extension
3. Use Firebase Console to view data
4. Check browser console for errors
5. Test APIs with Postman or Thunder Client

---

## ✨ Features Highlight

- 🎨 **Beautiful UI** - Energy dashboard theme
- 🤖 **Smart Algorithms** - 3 recommendation engines
- 📱 **Responsive** - Works on all devices
- 🔒 **Secure** - Firebase authentication
- 🚀 **Fast** - Vite + React optimization
- 📊 **Real Data** - 17+ sample records
- 📚 **Well Documented** - 7+ guide files
- 🔧 **Scalable** - Easy to extend

---

## 🆘 Getting Help

1. Check relevant README files
2. Review PROJECT_ROADMAP.md
3. Check console error messages
4. Verify .env configuration
5. Ensure Firebase credentials are correct

---

**You're all set! 🚀 Start building!**

---

For detailed information, see the comprehensive documentation files.
