import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      toast.success('Logged out successfully');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-cyan-800 to-sky-900 shadow-lg sticky top-0 z-50 border-b-4 border-cyan-400 border-opacity-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group transition-all duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 group-hover:shadow-2xl transition-all transform group-hover:scale-110 duration-300">
            <span className="text-white font-bold text-xl">FTY</span>
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent hidden sm:inline group-hover:from-white group-hover:via-cyan-200 group-hover:to-sky-200 transition-all duration-300">
            For Today's Youth
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-cyan-100 hover:text-cyan-300 font-semibold transition-all duration-300 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/courses" className="text-cyan-100 hover:text-cyan-300 font-semibold transition-all duration-300 relative group">
            Courses
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <button
            onClick={() => isAuthenticated ? navigate('/jobs') : navigate('/signup')}
            className="text-cyan-100 hover:text-sky-300 font-semibold transition-all duration-300 relative group cursor-pointer bg-none border-none"
          >
            Jobs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-cyan-100 hover:text-sky-300 font-semibold transition-all duration-300 relative group">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/profile" className="text-cyan-100 hover:text-blue-300 font-semibold transition-all duration-300 relative group">
                Profile
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </>
          )}
          <Link to="/contact" className="text-cyan-100 hover:text-blue-300 font-semibold transition-all duration-300 relative group">
            Contact Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-cyan-200 hidden sm:inline font-medium">
                Welcome, <span className="text-cyan-300 font-bold">{user?.displayName || 'User'}!</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-102 duration-300 active:scale-98"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="text-sm px-4 py-2 border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-blue-900 font-bold rounded-lg transition-all transform hover:scale-102 hover:shadow-lg hover:shadow-cyan-500/50 duration-300 active:scale-98">
                Login
              </Link>
              <Link to="/signup" className="text-sm px-4 py-2 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-blue-900 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-300 active:scale-98">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-cyan-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-900 to-cyan-900 border-t-2 border-cyan-400 border-opacity-30">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link to="/" className="block text-cyan-200 hover:text-cyan-300 font-semibold py-2 px-3 rounded-lg hover:bg-cyan-500 hover:bg-opacity-10 transition-all">
              Home
            </Link>
            <Link to="/courses" className="block text-cyan-200 hover:text-cyan-300 font-semibold py-2 px-3 rounded-lg hover:bg-cyan-500 hover:bg-opacity-10 transition-all">
              Courses
            </Link>
            <button
              onClick={() => isAuthenticated ? (setIsOpen(false), navigate('/jobs')) : navigate('/signup')}
              className="w-full text-left text-cyan-200 hover:text-sky-300 font-semibold py-2 px-3 rounded-lg hover:bg-sky-500 hover:bg-opacity-10 transition-all bg-none border-none cursor-pointer"
            >
              Jobs
            </button>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="block text-cyan-200 hover:text-sky-300 font-semibold py-2 px-3 rounded-lg hover:bg-sky-500 hover:bg-opacity-10 transition-all">
                  Dashboard
                </Link>
                <Link to="/profile" className="block text-cyan-200 hover:text-blue-300 font-semibold py-2 px-3 rounded-lg hover:bg-blue-500 hover:bg-opacity-10 transition-all">
                  Profile
                </Link>
              </>
            )}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-cyan-200 hover:text-blue-300 font-semibold py-2 px-3 rounded-lg hover:bg-blue-500 hover:bg-opacity-10 transition-all">
              Contact Us
            </Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" className="block text-cyan-200 hover:text-cyan-100 font-semibold py-2 px-3 rounded-lg border border-cyan-300 text-center hover:bg-cyan-500 hover:bg-opacity-10 transition-all">
                  Login
                </Link>
                <Link to="/signup" className="block text-blue-900 font-bold py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-400 text-center hover:from-cyan-300 hover:to-sky-300 transition-all">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
