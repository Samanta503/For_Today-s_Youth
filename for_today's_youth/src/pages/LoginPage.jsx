import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import toast from 'react-hot-toast';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-sky-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-t-4 border-cyan-500">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-blue-900 via-cyan-800 to-sky-900 p-8 text-white">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-sky-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-blue-900 font-bold text-2xl">FTY</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-cyan-200 text-sm mt-1">Continue Your Journey</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-cyan-500 bg-blue-50 focus:bg-white transition"
                  disabled={loading}
                />
                {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-blue-900 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-cyan-500 bg-blue-50 focus:bg-white transition"
                  disabled={loading}
                />
                {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 hover:underline transition">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-blue-900 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login to Your Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-blue-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-blue-600 font-semibold">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-blue-900">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cyan-600 font-bold hover:text-cyan-700 underline">
                Create One Here
              </Link>
            </p>

            {/* Features List */}
            <div className="mt-8 pt-6 border-t-2 border-blue-100 space-y-3">
              <p className="text-sm font-semibold text-blue-900 text-center mb-4">Access Your Dashboard to:</p>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 flex items-center justify-center text-white text-xs font-bold">✓</span>
                  <span>Get personalized job recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-sky-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold">✓</span>
                  <span>Discover skill development paths</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">✓</span>
                  <span>Find relevant courses & resources</span>
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-center text-blue-600 text-xs mt-6 leading-relaxed">
              By logging in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-700">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Your data is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};
