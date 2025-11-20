import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              
              {/* Placeholder routes - to be implemented */}
              <Route path="/dashboard" element={<div className="p-8 text-center"><h1>Dashboard - Coming Soon</h1></div>} />
              <Route path="/profile" element={<div className="p-8 text-center"><h1>Profile - Coming Soon</h1></div>} />
              <Route path="/jobs" element={<div className="p-8 text-center"><h1>Jobs - Coming Soon</h1></div>} />
              <Route path="/skills" element={<div className="p-8 text-center"><h1>Skills - Coming Soon</h1></div>} />
              <Route path="/courses" element={<div className="p-8 text-center"><h1>Courses - Coming Soon</h1></div>} />
              
              {/* 404 - Not Found */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </AuthProvider>
    </Router>
  );
}

export default App;
