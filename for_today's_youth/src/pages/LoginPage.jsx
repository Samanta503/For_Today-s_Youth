import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import toast from 'react-hot-toast';

const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }
  .animate-slide-in-down {
    animation: slideInDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }
  .form-field {
    transition: border-color 0.2s ease-out, background-color 0.2s ease-out;
  }
  .form-field:hover {
    border-color: rgba(34, 211, 238, 1) !important;
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.3) !important;
  }
  .form-field:focus {
    border-color: rgba(34, 211, 238, 1) !important;
    box-shadow: 0 0 25px rgba(34, 211, 238, 0.4) !important;
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
  const [showPassword, setShowPassword] = useState(false);

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
    } catch (error) {
      console.error('Login error:', error);
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
        <div className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl shadow-2xl overflow-hidden border-t-4 border-cyan-500 border-opacity-50 animate-fade-in-up transition-all duration-200 hover:border-cyan-400 hover:border-opacity-100 hover:shadow-2xl hover:shadow-cyan-500/40">
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
                  className="form-field w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400"
                  disabled={loading}
                />
                {errors.email && <span className="text-red-400 text-sm mt-1 block animate-fade-in-up">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div className="animate-fade-in-up stagger-3 transition-all duration-500">
                <label className="block text-sm font-bold text-cyan-300 mb-2 hover:text-cyan-200 transition-colors duration-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="form-field w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 pr-14"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                    title={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 5C7 5 2.73 8.11 1 12.46c1.73 4.35 6 7.54 11 7.54s9.27-3.19 11-7.54C21.27 8.11 17 5 12 5zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3M7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm5.31-7.78L11 5.07c-.39-.04-.8-.07-1.2-.07-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5 4 0 7.54-1.98 9.57-5l-3.48-3.48c-.87 1.17-2.23 1.95-3.75 1.95-3.31 0-6-2.69-6-6 0-1.52.78-2.88 1.95-3.75z" />
                      </svg>
                    )}
                  </button>
                </div>
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
                className="w-full py-4 text-lg font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-lg shadow-lg hover:shadow-xl hover:shadow-cyan-400/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in-up stagger-4"
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
