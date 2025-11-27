import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import toast from 'react-hot-toast';

const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  .animate-slide-in-down {
    animation: slideInDown 0.6s ease-out forwards;
  }
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
`;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(formData.email, formData.password);

      if (result.success) {
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-8">
      <style>{animationStyles}</style>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl shadow-2xl overflow-hidden border-t-4 border-cyan-500 border-opacity-50 hover:border-opacity-100 hover:border-cyan-400 animate-fade-in-up transition-all duration-500 hover:shadow-cyan-500/50 hover:shadow-2xl">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 p-8 text-white animate-slide-in-down">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-sky-400 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <span className="text-slate-900 font-bold text-2xl">FTY</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold hover:scale-105 transition-transform duration-300">Welcome Back</h1>
                <p className="text-cyan-300 text-sm mt-1">Continue Your Journey</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up stagger-2">
              {/* Email Field */}
              <div className="animate-fade-in-up stagger-2 transition-all duration-500">
                <label className="block text-sm font-bold text-cyan-300 mb-2 hover:text-cyan-200 transition-colors duration-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50"
                  disabled={loading}
                />
                {errors.email && <span className="text-red-400 text-sm mt-1 block animate-fade-in-up">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div className="animate-fade-in-up stagger-3 transition-all duration-500">
                <label className="block text-sm font-bold text-cyan-300 mb-2 hover:text-cyan-200 transition-colors duration-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50"
                  disabled={loading}
                />
                {errors.password && <span className="text-red-400 text-sm mt-1 block animate-fade-in-up">{errors.password}</span>}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right animate-fade-in-up stagger-3 transition-all duration-500">
                <Link to="/forgot-password" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-all duration-300">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-lg shadow-lg hover:shadow-xl hover:shadow-cyan-400/50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in-up stagger-4 active:scale-95"
              >
                {loading ? 'Logging in...' : 'Login to Your Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8 animate-fade-in-up stagger-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-r from-slate-800 to-blue-900 text-cyan-300 font-semibold">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-300 animate-fade-in-up stagger-5 transition-all duration-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cyan-400 font-bold hover:text-cyan-300 underline hover:scale-105 transition-transform duration-300 inline-block">
                Create One Here
              </Link>
            </p>

            {/* Features List */}
            <div className="mt-8 pt-6 border-t-2 border-slate-700 space-y-3 animate-fade-in-up stagger-5">
              <p className="text-sm font-semibold text-cyan-300 text-center mb-4">Access Your Dashboard to:</p>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 flex items-center justify-center text-slate-900 text-xs font-bold">✓</span>
                  <span>Get personalized job recommendations</span>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-sky-400 to-blue-400 flex items-center justify-center text-slate-900 text-xs font-bold">✓</span>
                  <span>Discover skill development paths</span>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-slate-900 text-xs font-bold">✓</span>
                  <span>Find relevant courses & resources</span>
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-center text-blue-600 text-xs mt-6 leading-relaxed animate-fade-in-up stagger-5">
              By logging in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-700 animate-fade-in-up hover:scale-105 transition-transform duration-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Your data is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};
