import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
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
  .stagger-6 { animation-delay: 0.6s; }
`;

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    educationLevel: '12th',
    skills: '',
    workExperience: '',
    languages: '',
    programmingLanguages: '',
    extracurricularActivities: '',
    careerInterests: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const educationLevels = [
    { value: '10th', label: '10th Standard' },
    { value: '12th', label: '12th Standard' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor', label: "Bachelor's Degree" },
    { value: 'master', label: "Master's Degree" },
    { value: 'phd', label: 'PhD' },
  ];

  const skillOptions = ['Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management', 'Creativity', 'Data Analysis', 'Project Management'];
  const languageOptions = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Portuguese'];
  const programmingLanguageOptions = ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Go', 'Rust', 'TypeScript'];
  const activityOptions = ['Sports', 'Debate', 'Art', 'Music', 'Coding', 'Robotics', 'Drama', 'Volunteering', 'Research', 'Entrepreneurship'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name should be at least 3 characters';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      // Prepare profile data object
      const profileData = {
        fullName: formData.fullName,
        email: formData.email,
        educationLevel: formData.educationLevel,
        careerInterests: formData.careerInterests,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : [],
        languages: formData.languages ? formData.languages.split(',').map(l => l.trim()).filter(l => l) : [],
        programmingLanguages: formData.programmingLanguages ? formData.programmingLanguages.split(',').map(p => p.trim()).filter(p => p) : [],
        workExperience: formData.workExperience,
        extracurricularActivities: formData.extracurricularActivities ? formData.extracurricularActivities.split(',').map(a => a.trim()).filter(a => a) : [],
        qualifications: {},
        interests: [],
        profileComplete: false,
      };

      // Register user with password only, profile data passed along
      const authResult = await registerUser(formData.email, formData.password, profileData);

      if (authResult.success) {
        toast.success('Account created successfully!');
        navigate('/profile');
      } else {
        toast.error(authResult.message || 'Registration failed. Please try again.');
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          {/* Card */}
          <div className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl shadow-2xl overflow-hidden border-t-4 border-cyan-500 border-opacity-50 hover:border-cyan-400 hover:border-opacity-100 animate-fade-in-up transition-all duration-300 hover:shadow-cyan-500/50 hover:shadow-2xl">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 p-8 text-white animate-slide-in-down">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-sky-400 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transform transition-all duration-300">
                  <span className="text-slate-900 font-bold text-2xl">FTY</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Create Your Account</h1>
                  <p className="text-cyan-300 mt-1">Build your professional profile</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up stagger-1">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50"
                      disabled={loading}
                    />
                    {errors.fullName && <span className="text-red-400 text-sm mt-1">{errors.fullName}</span>}
                  </div>

                  <div className="animate-fade-in-up stagger-2">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50"
                      disabled={loading}
                    />
                    {errors.email && <span className="text-red-400 text-sm mt-1">{errors.email}</span>}
                  </div>
                </div>

                {/* Row 2: Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up stagger-3">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50"
                      disabled={loading}
                    />
                    {errors.password && <span className="text-red-400 text-sm mt-1">{errors.password}</span>}
                  </div>

                  <div className="animate-fade-in-up stagger-4">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50"
                      disabled={loading}
                    />
                    {errors.confirmPassword && <span className="text-red-400 text-sm mt-1">{errors.confirmPassword}</span>}
                  </div>
                </div>

                {/* Row 3: Education & Career Interests */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up stagger-5">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Current Education Level</label>
                    <select
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50"
                      disabled={loading}
                    >
                      {educationLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="animate-fade-in-up stagger-6">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Career Interests</label>
                    <input
                      type="text"
                      name="careerInterests"
                      value={formData.careerInterests}
                      onChange={handleChange}
                      placeholder="e.g., Web Development, Data Science"
                      className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Row 4: Skills & Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up stagger-1">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Skills (comma-separated)</label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder={`e.g., ${skillOptions.slice(0, 3).join(', ')}`}
                      className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50 h-24 resize-none"
                      disabled={loading}
                    />
                    <p className="text-xs text-cyan-400 mt-1">Popular: {skillOptions.join(', ')}</p>
                  </div>

                  <div className="animate-fade-in-up stagger-2">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Languages (comma-separated)</label>
                    <textarea
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      placeholder={`e.g., ${languageOptions.slice(0, 3).join(', ')}`}
                      className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50 h-24 resize-none"
                      disabled={loading}
                    />
                    <p className="text-xs text-cyan-400 mt-1">Popular: {languageOptions.join(', ')}</p>
                  </div>
                </div>

                {/* Row 5: Programming & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up stagger-3">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Programming Languages (comma-separated)</label>
                    <textarea
                      name="programmingLanguages"
                      value={formData.programmingLanguages}
                      onChange={handleChange}
                      placeholder={`e.g., ${programmingLanguageOptions.slice(0, 3).join(', ')}`}
                      className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50 h-24 resize-none"
                      disabled={loading}
                    />
                    <p className="text-xs text-cyan-400 mt-1">Popular: {programmingLanguageOptions.join(', ')}</p>
                  </div>

                  <div className="animate-fade-in-up stagger-4">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Work Experience</label>
                    <textarea
                      name="workExperience"
                      value={formData.workExperience}
                      onChange={handleChange}
                      placeholder="e.g., Intern at Company XYZ (2023-2024), Freelance Web Developer"
                      className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50 h-24 resize-none"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Row 6: Extracurricular */}
                <div className="animate-fade-in-up stagger-5">
                  <label className="block text-sm font-bold text-cyan-300 mb-2">Extracurricular Activities (comma-separated)</label>
                  <textarea
                    name="extracurricularActivities"
                    value={formData.extracurricularActivities}
                    onChange={handleChange}
                    placeholder={`e.g., ${activityOptions.slice(0, 4).join(', ')}`}
                    className="w-full px-4 py-3 border-2 border-cyan-500 border-opacity-30 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 focus:bg-slate-600 text-white placeholder-gray-400 transition-all duration-300 hover:border-cyan-500 hover:border-opacity-50 h-24 resize-none"
                    disabled={loading}
                  />
                  <p className="text-xs text-cyan-400 mt-1">Popular: {activityOptions.join(', ')}</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-lg font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-lg shadow-lg hover:shadow-xl hover:shadow-cyan-400/50 transform hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8 animate-fade-in-up stagger-6"
                >
                  {loading ? 'Creating Account...' : 'Create Account & Get Started'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8 animate-fade-in-up stagger-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-r from-slate-800 to-blue-900 text-cyan-300 font-semibold">or</span>
                </div>
              </div>

              {/* Login Link */}
              <p className="text-center text-gray-300 animate-fade-in-up stagger-2">
                Already have an account?{' '}
                <Link to="/login" className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline underline transition-all duration-300">
                  Login Here
                </Link>
              </p>

              {/* Footer Text */}
              <p className="text-center text-blue-600 text-xs mt-6 leading-relaxed animate-fade-in-up stagger-3">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
                <br />
                Your information helps us provide personalized career recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
