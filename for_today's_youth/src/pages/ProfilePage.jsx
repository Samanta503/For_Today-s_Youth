import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserProfileByEmail, updateUserProfileByEmail } from '../services/authService';
import { logoutUser } from '../services/authService';
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
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  @keyframes borderGlow {
    0% {
      border-color: rgba(34, 211, 238, 0.2);
      box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.2), inset 0 0 20px rgba(34, 211, 238, 0.05);
    }
    50% {
      border-color: rgba(34, 211, 238, 0.6);
      box-shadow: 0 0 25px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1);
    }
    100% {
      border-color: rgba(6, 182, 212, 1);
      box-shadow: 0 0 40px rgba(6, 182, 212, 0.6), inset 0 0 20px rgba(6, 182, 212, 0.15);
    }
  }
  @keyframes cardLift {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-8px);
    }
  }
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  @keyframes softGlow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
    }
    50% {
      box-shadow: 0 0 30px rgba(34, 211, 238, 0.6);
    }
  }
  .profile-card {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }
  .profile-card-hover {
    transition: all 0.2s ease-out;
  }
  .profile-card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(34, 211, 238, 0.4);
    border-color: rgba(34, 211, 238, 0.9);
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }
  .animate-slide-in-down {
    animation: slideInDown 0.6s ease-out forwards;
  }
  .animate-slide-in-left {
    animation: slideInLeft 0.6s ease-out forwards;
  }
  .animate-scale-in {
    animation: scaleIn 0.4s ease-out forwards;
  }
  .animate-fade-in-scale {
    animation: fadeInScale 0.5s ease-out forwards;
  }
  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  .card-hover:hover {
    animation: borderGlow 0.6s ease-out forwards;
  }
  .smooth-transition {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .input-focus:focus {
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.5), inset 0 0 10px rgba(34, 211, 238, 0.1);
  }
  .btn-smooth:active {
    transition: all 0.2s ease;
  }
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
  .stagger-6 { animation-delay: 0.6s; }
`;

export const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Fetch user profile from Firestore on component mount
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user?.email) {
      const fetchUserProfile = async () => {
        try {
          setLoading(true);
          const result = await getUserProfileByEmail(user.email);
          
          if (result.success) {
            setProfileData(result.data);
            setEditData(result.data);
          } else {
            toast.error('Failed to load profile');
          }
        } catch (errorMsg) {
          console.error('Error fetching profile:', errorMsg);
          toast.error('Error loading profile');
        } finally {
          setLoading(false);
        }
      };
      fetchUserProfile();
    }
  }, [user, authLoading, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(profileData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    const updatedArray = [...editData[field]];
    updatedArray[index] = value;
    setEditData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const handleAddArrayItem = (field) => {
    setEditData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setEditData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const result = await updateUserProfileByEmail(user.email, editData);
      
      if (result.success) {
        setProfileData(editData);
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (errorMsg) {
      console.error('Error updating profile:', errorMsg);
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      if (result.success) {
        toast.success('Logged out successfully!');
        navigate('/');
      }
    } catch {
      toast.error('Error logging out');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 mb-4 animate-spin">
            <div className="h-14 w-14 rounded-full bg-slate-900"></div>
          </div>
          <p className="text-white text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please Login</h1>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-sky-400 text-blue-900 font-bold rounded-lg hover:from-cyan-300 hover:to-sky-300 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-in-down">
            <div className="bg-gradient-to-r from-blue-900 via-cyan-800 to-sky-900 rounded-3xl p-8 border-b-4 border-cyan-400">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
                  <p className="text-cyan-200">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {profileData && (
            <>
              {/* Profile Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Full Name Card */}
                <div className="profile-card profile-card-hover bg-gradient-to-br from-slate-800 to-blue-800 rounded-2xl p-6 shadow-xl border-2 border-cyan-500" style={{ animationDelay: '0.1s' }}>
                  <p className="text-cyan-300 text-sm font-semibold mb-1">Full Name</p>
                  <h3 className="text-2xl font-bold text-gray-200">{profileData.fullName || 'N/A'}</h3>
                </div>

                {/* Education Card */}
                <div className="profile-card profile-card-hover bg-gradient-to-br from-slate-800 to-blue-800 rounded-2xl p-6 shadow-xl border-2 border-sky-500" style={{ animationDelay: '0.2s' }}>
                  <p className="text-sky-300 text-sm font-semibold mb-1">Education Level</p>
                  <h3 className="text-2xl font-bold text-gray-200 capitalize">{profileData.educationLevel || 'N/A'}</h3>
                </div>

                {/* Career Interests Card */}
                <div className="profile-card profile-card-hover bg-gradient-to-br from-slate-800 to-blue-800 rounded-2xl p-6 shadow-xl border-2 border-blue-500" style={{ animationDelay: '0.3s' }}>
                  <p className="text-blue-300 text-sm font-semibold mb-1">Career Interests</p>
                  <h3 className="text-2xl font-bold text-gray-200">{profileData.careerInterests || 'N/A'}</h3>
                </div>
              </div>

              {/* Edit Button */}
              <div className="mb-8 flex gap-4 justify-end animate-fade-in-up stagger-4">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-sky-400 text-blue-900 font-bold rounded-lg hover:from-cyan-300 hover:to-sky-300 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl smooth-transition btn-smooth"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-4 animate-fade-in-scale">
                    <button
                      onClick={handleCancel}
                      className="px-8 py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 smooth-transition btn-smooth shadow-md hover:shadow-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold rounded-lg hover:from-green-300 hover:to-emerald-300 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 active:scale-95 smooth-transition btn-smooth shadow-md hover:shadow-lg"
                    >
                      {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                  </div>
                )}
              </div>

              {/* Main Content */}
              {!isEditing ? (
                <div className="space-y-6 animate-fade-in-scale">
                  {/* Skills Section */}
                  <div className="profile-card profile-card-hover bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-2 border-cyan-500" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-3 animate-scale-in">🎯</span>
                      <h2 className="text-3xl font-bold text-cyan-300">Skills</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {profileData.skills && profileData.skills.length > 0 ? (
                        profileData.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-3 bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold rounded-full border-2 border-cyan-400 hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-default smooth-transition"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-400 italic">No skills added yet</p>
                      )}
                    </div>
                  </div>

                  {/* Languages Section */}
                  <div className="profile-card profile-card-hover bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-2 border-blue-500" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-3 animate-scale-in">🌐</span>
                      <h2 className="text-3xl font-bold text-blue-300">Languages</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {profileData.languages && profileData.languages.length > 0 ? (
                        profileData.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full border-2 border-blue-400 hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-default smooth-transition"
                          >
                            {lang}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-400 italic">No languages added yet</p>
                      )}
                    </div>
                  </div>

                  {/* Programming Languages Section */}
                  <div className="profile-card profile-card-hover bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-2 border-purple-500" style={{ animationDelay: '0.6s' }}>
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-3 animate-scale-in">💻</span>
                      <h2 className="text-3xl font-bold text-purple-300">Programming Languages</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {profileData.programmingLanguages && profileData.programmingLanguages.length > 0 ? (
                        profileData.programmingLanguages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full border-2 border-purple-400 hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-default smooth-transition"
                          >
                            {lang}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-400 italic">No programming languages added yet</p>
                      )}
                    </div>
                  </div>

                  {/* Work Experience Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Work Experience Level */}
                    <div className="bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-2 border-cyan-500 hover:border-cyan-400 hover:bg-gradient-to-br hover:from-slate-700 hover:to-blue-700 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center mb-6">
                        <span className="text-4xl mr-3">📊</span>
                        <h2 className="text-2xl font-bold text-cyan-300">Experience Level</h2>
                      </div>
                      <p className="text-gray-300 text-lg font-semibold capitalize">
                        {profileData.workExperienceLevel ? (
                          profileData.workExperienceLevel.charAt(0).toUpperCase() + profileData.workExperienceLevel.slice(1)
                        ) : (
                          'Not specified'
                        )}
                      </p>
                    </div>

                    {/* Work Experience Details */}
                    <div className="bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-2 border-sky-500 hover:border-sky-400 hover:bg-gradient-to-br hover:from-slate-700 hover:to-blue-700 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center mb-6">
                        <span className="text-4xl mr-3">💼</span>
                        <h2 className="text-2xl font-bold text-sky-300">Work Details</h2>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {profileData.workExperienceDetails || 'No work experience details added yet'}
                      </p>
                    </div>
                  </div>

                  {/* Extracurricular Activities Section */}
                  <div className="bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-2 border-orange-500 hover:border-orange-400 hover:bg-gradient-to-br hover:from-slate-700 hover:to-blue-700 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-3">🏆</span>
                      <h2 className="text-3xl font-bold text-orange-300">Extracurricular Activities</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {profileData.extracurricularActivities && profileData.extracurricularActivities.length > 0 ? (
                        profileData.extracurricularActivities.map((activity, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-full border-2 border-orange-400 hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-default"
                          >
                            {activity}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-400 italic">No activities added yet</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <div className="space-y-6 bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-2 border-cyan-500 animate-fade-in-scale">
                  <h2 className="text-2xl font-bold text-cyan-300 mb-6 animate-fade-in-up">Edit Your Profile</h2>
                  {/* Full Name */}
                  <div className="animate-fade-in-up stagger-1 smooth-transition">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={editData.fullName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/50 bg-slate-700 text-gray-200 transition-colors duration-200 placeholder-gray-500 input-focus smooth-transition"
                    />
                  </div>

                  {/* Education Level */}
                  <div className="animate-fade-in-up stagger-2 smooth-transition">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Education Level</label>
                    <select
                      name="educationLevel"
                      value={editData.educationLevel || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/50 bg-slate-700 text-gray-200 transition-colors duration-200 input-focus smooth-transition"
                    >
                      <option value="">Select Education Level</option>
                      <option value="10th">10th Standard</option>
                      <option value="12th">12th Standard</option>
                      <option value="diploma">Diploma</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>

                  {/* Career Interests */}
                  <div className="animate-fade-in-up stagger-3 smooth-transition">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Career Interests</label>
                    <input
                      type="text"
                      name="careerInterests"
                      value={editData.careerInterests || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/50 bg-slate-700 text-gray-200 transition-colors duration-200 placeholder-gray-500 input-focus smooth-transition"
                    />
                  </div>

                  {/* Skills */}
                  <div className="animate-fade-in-up stagger-4 smooth-transition">
                    <label className="block text-sm font-bold text-cyan-300 mb-3 transition-all duration-200">Skills</label>
                    <div className="space-y-2">
                      {editData.skills && editData.skills.map((skill, idx) => (
                        <div key={idx} className="flex gap-2 animate-fade-in-up smooth-transition">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleArrayChange(e, 'skills', idx)}
                            className="flex-1 px-4 py-2 border-2 border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 transition-colors duration-200 placeholder-gray-500 input-focus smooth-transition"
                            placeholder="Skill"
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('skills', idx)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200 smooth-transition btn-smooth"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('skills')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-900 font-bold rounded-lg hover:from-cyan-400 hover:to-sky-400 transition-colors duration-200 smooth-transition btn-smooth"
                      >
                        + Add Skill
                      </button>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="animate-fade-in-up stagger-5 smooth-transition">
                    <label className="block text-sm font-bold text-blue-300 mb-3 transition-all duration-200">Languages</label>
                    <div className="space-y-2">
                      {editData.languages && editData.languages.map((lang, idx) => (
                        <div key={idx} className="flex gap-2 animate-fade-in-up smooth-transition">
                          <input
                            type="text"
                            value={lang}
                            onChange={(e) => handleArrayChange(e, 'languages', idx)}
                            className="flex-1 px-4 py-2 border-2 border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 transition-colors duration-200 placeholder-gray-500 input-focus smooth-transition"
                            placeholder="Language"
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('languages', idx)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200 smooth-transition btn-smooth"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('languages')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-colors duration-200 smooth-transition btn-smooth"
                      >
                        + Add Language
                      </button>
                    </div>
                  </div>

                  {/* Programming Languages */}
                  <div className="animate-fade-in-up stagger-6 smooth-transition">
                    <label className="block text-sm font-bold text-purple-300 mb-3 transition-all duration-200">Programming Languages</label>
                    <div className="space-y-2">
                      {editData.programmingLanguages && editData.programmingLanguages.map((lang, idx) => (
                        <div key={idx} className="flex gap-2 animate-fade-in-up smooth-transition">
                          <input
                            type="text"
                            value={lang}
                            onChange={(e) => handleArrayChange(e, 'programmingLanguages', idx)}
                            className="flex-1 px-4 py-2 border-2 border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 transition-colors duration-200 placeholder-gray-500 input-focus smooth-transition"
                            placeholder="Programming Language"
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('programmingLanguages', idx)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200 smooth-transition btn-smooth"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('programmingLanguages')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-400 hover:to-pink-400 transition-colors duration-200 smooth-transition btn-smooth"
                      >
                        + Add Programming Language
                      </button>
                    </div>
                  </div>

                  {/* Work Experience Level */}
                  <div className="animate-fade-in-up stagger-6 smooth-transition">
                    <label className="block text-sm font-bold text-cyan-300 mb-2 transition-all duration-200">Work Experience Level</label>
                    <select
                      name="workExperienceLevel"
                      value={editData.workExperienceLevel || 'beginner'}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 transition-colors duration-200 placeholder-gray-500 input-focus smooth-transition focus:ring-2 focus:ring-cyan-300/50"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="advance">Advance</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>

                  {/* Work Experience Details */}
                  <div className="animate-fade-in-up stagger-1 smooth-transition">
                    <label className="block text-sm font-bold text-sky-300 mb-2 transition-all duration-200">Work Experience Details</label>
                    <textarea
                      name="workExperienceDetails"
                      value={editData.workExperienceDetails || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 transition-colors duration-200 h-24 resize-none placeholder-gray-500 input-focus smooth-transition focus:ring-2 focus:ring-cyan-300/50"
                      placeholder="e.g., Intern at Company XYZ (2023-2024), Freelance Web Developer"
                    />
                  </div>

                  {/* Extracurricular Activities */}
                  <div className="animate-fade-in-up stagger-1 smooth-transition">
                    <label className="block text-sm font-bold text-orange-300 mb-2 transition-all duration-200">Extracurricular Activities</label>
                    <div className="space-y-2">
                      {editData.extracurricularActivities && editData.extracurricularActivities.map((activity, idx) => (
                        <div key={idx} className="flex gap-2 animate-fade-in-up smooth-transition">
                          <input
                            type="text"
                            value={activity}
                            onChange={(e) => handleArrayChange(e, 'extracurricularActivities', idx)}
                            className="flex-1 px-4 py-2 border-2 border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 transition-colors duration-200 placeholder-gray-500 input-focus smooth-transition"
                            placeholder="Activity"
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('extracurricularActivities', idx)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-bold smooth-transition"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('extracurricularActivities')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-400 hover:to-red-400 transition-colors duration-200 smooth-transition"
                      >
                        + Add Activity
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
