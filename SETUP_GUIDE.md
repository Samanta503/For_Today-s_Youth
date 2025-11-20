# For Today's Youth - Quick Setup Guide

## 📋 Step-by-Step Setup Instructions

### Step 1: Clone/Download the Project
```bash
cd /path/to/For_Today-s_Youth
```

### Step 2: Setup Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Get your credentials from Project Settings
4. Create Firestore Database
5. Enable Firebase Authentication

### Step 3: Frontend Setup

```bash
# Navigate to frontend
cd for_today's_youth

# Install dependencies
npm install

# Create .env file
echo "VITE_FIREBASE_API_KEY=YOUR_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

**Frontend URL**: `http://localhost:5173`

### Step 4: Backend Setup

```bash
# Navigate to backend
cd ../backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000
NODE_ENV=development
DATABASE_URL=YOUR_DATABASE_URL" > .env

# Start backend server
npm run dev
```

**Backend URL**: `http://localhost:5000`

### Step 5: Test the Application

**Landing Page**: http://localhost:5173
**API Health**: http://localhost:5000/api/health

### Step 6: Create Your First Account

1. Click "Sign Up" on landing page
2. Fill in your details
3. Select your education level
4. Verify email (if configured)
5. Complete your profile with qualifications

---

## 🔧 Troubleshooting

### Issue: Firebase credentials not working
**Solution**: 
- Copy credentials from Firebase Console
- Ensure `.env` file is in correct location
- Restart dev server after changing .env

### Issue: Backend server won't start
**Solution**:
- Check if port 5000 is already in use
- Ensure Node.js is installed
- Clear npm cache: `npm cache clean --force`

### Issue: Tailwind CSS not showing
**Solution**:
- Run: `npm install` again
- Clear browser cache
- Restart dev server

### Issue: CORS errors
**Solution**:
- Ensure backend is running on port 5000
- Check VITE_API_URL in .env
- Verify CORS is enabled in backend

---

## 📚 File Descriptions

### Frontend Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with routing |
| `src/pages/LandingPage.jsx` | Homepage |
| `src/pages/LoginPage.jsx` | User login |
| `src/pages/SignUpPage.jsx` | User registration |
| `src/config/firebaseConfig.js` | Firebase setup |
| `src/services/authService.js` | Authentication |
| `tailwind.config.js` | Tailwind configuration |

### Backend Key Files

| File | Purpose |
|------|---------|
| `src/server.js` | Express server |
| `src/utils/jobMatcher.js` | Job matching algorithm |
| `src/utils/skillAnalyzer.js` | Skill analysis |
| `src/utils/courseRecommender.js` | Course recommendations |
| `src/utils/sampleData.js` | Mock database |

---

## 🎯 Next Steps After Setup

1. **Explore Landing Page** - See the beautiful UI
2. **Create an Account** - Test sign up flow
3. **Login** - Test authentication
4. **Update Profile** - Add your qualifications
5. **Check Dashboard** - View recommendations (coming soon)

---

## 📖 Learn More

- **Frontend Docs**: See `for_today's_youth/README.md`
- **Backend Docs**: See `backend/README.md`
- **Full Roadmap**: See `PROJECT_ROADMAP.md`

---

## 🆘 Need Help?

1. Check the README files in each directory
2. Review the PROJECT_ROADMAP.md for architecture details
3. Check console for error messages
4. Verify all environment variables are set

---

**Happy Coding! 🚀**
