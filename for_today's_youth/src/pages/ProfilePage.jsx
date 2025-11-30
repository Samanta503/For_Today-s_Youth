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
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
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
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
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
  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
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
                <div className="animate-fade-in-up stagger-1 bg-gradient-to-br from-slate-800 to-blue-800 rounded-2xl p-6 shadow-xl border-l-4 border-cyan-500">
                  <p className="text-cyan-300 text-sm font-semibold mb-1">Full Name</p>
                  <h3 className="text-2xl font-bold text-gray-200">{profileData.fullName || 'N/A'}</h3>
                </div>

                {/* Education Card */}
                <div className="animate-fade-in-up stagger-2 bg-gradient-to-br from-slate-800 to-blue-800 rounded-2xl p-6 shadow-xl border-l-4 border-sky-500">
                  <p className="text-sky-300 text-sm font-semibold mb-1">Education Level</p>
                  <h3 className="text-2xl font-bold text-gray-200 capitalize">{profileData.educationLevel || 'N/A'}</h3>
                </div>

                {/* Career Interests Card */}
                <div className="animate-fade-in-up stagger-3 bg-gradient-to-br from-slate-800 to-blue-800 rounded-2xl p-6 shadow-xl border-l-4 border-blue-500">
                  <p className="text-blue-300 text-sm font-semibold mb-1">Career Interests</p>
                  <h3 className="text-2xl font-bold text-gray-200">{profileData.careerInterests || 'N/A'}</h3>
                </div>
              </div>

              {/* Edit Button */}
              <div className="mb-8 flex gap-4 justify-end animate-fade-in-up stagger-4">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-sky-400 text-blue-900 font-bold rounded-lg hover:from-cyan-300 hover:to-sky-300 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-8 py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold rounded-lg hover:from-green-300 hover:to-emerald-300 disabled:opacity-50 transition-all duration-200"
                    >
                      {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                  </>
                )}
              </div>

              {/* Main Content */}
              {!isEditing ? (
                <div className="space-y-6">
                  {/* Skills Section */}
                  <div className="animate-fade-in-up stagger-1 bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-t-4 border-cyan-500 hover:shadow-3xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-3">🎯</span>
                      <h2 className="text-3xl font-bold text-cyan-300">Skills</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {profileData.skills && profileData.skills.length > 0 ? (
                        profileData.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-3 bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold rounded-full border-2 border-cyan-400 hover:shadow-xl hover:scale-110 transform transition-all duration-300 cursor-default"
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
                  <div className="animate-fade-in-up stagger-2 bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-t-4 border-blue-500 hover:shadow-3xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-3">🌐</span>
                      <h2 className="text-3xl font-bold text-blue-300">Languages</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {profileData.languages && profileData.languages.length > 0 ? (
                        profileData.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full border-2 border-blue-400 hover:shadow-xl hover:scale-110 transform transition-all duration-300 cursor-default"
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
                  <div className="animate-fade-in-up stagger-3 bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-t-4 border-purple-500 hover:shadow-3xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-3">💻</span>
                      <h2 className="text-3xl font-bold text-purple-300">Programming Languages</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {profileData.programmingLanguages && profileData.programmingLanguages.length > 0 ? (
                        profileData.programmingLanguages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full border-2 border-purple-400 hover:shadow-xl hover:scale-110 transform transition-all duration-300 cursor-default"
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
                  <div className="animate-fade-in-up stagger-4 bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-l-4 border-cyan-500 hover:shadow-3xl transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/20">
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-3">💼</span>
                      <h2 className="text-3xl font-bold text-cyan-300">Work Experience</h2>
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-lg">
                      {profileData.workExperience || 'No work experience added yet'}
                    </p>
                  </div>

                  {/* Extracurricular Activities Section */}
                  <div className="animate-fade-in-up stagger-5 bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-t-4 border-orange-500 hover:shadow-3xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <span className="text-4xl mr-3">🏆</span>
                      <h2 className="text-3xl font-bold text-orange-300">Extracurricular Activities</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {profileData.extracurricularActivities && profileData.extracurricularActivities.length > 0 ? (
                        profileData.extracurricularActivities.map((activity, idx) => (
                          <span
                            key={idx}
                            className="px-5 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-full border-2 border-orange-400 hover:shadow-xl hover:scale-110 transform transition-all duration-300 cursor-default"
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
                <div className="space-y-6 bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl p-8 shadow-2xl border-t-4 border-cyan-500 animate-scale-in">
                  <h2 className="text-2xl font-bold text-cyan-300 mb-6">Edit Your Profile</h2>
                  {/* Full Name */}
                  <div className="animate-fade-in-up stagger-1">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={editData.fullName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/30 bg-slate-700 text-gray-200 transition-all duration-300 hover:border-cyan-400 placeholder-gray-500"
                    />
                  </div>

                  {/* Education Level */}
                  <div className="animate-fade-in-up stagger-2">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Education Level</label>
                    <select
                      name="educationLevel"
                      value={editData.educationLevel || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/30 bg-slate-700 text-gray-200 transition-all duration-300 hover:border-cyan-400"
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
                  <div className="animate-fade-in-up stagger-3">
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Career Interests</label>
                    <input
                      type="text"
                      name="careerInterests"
                      value={editData.careerInterests || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/30 bg-slate-700 text-gray-200 transition-all duration-300 hover:border-cyan-400 placeholder-gray-500"
                    />
                  </div>

                  {/* Skills */}
                  <div className="animate-fade-in-up stagger-4">
                    <label className="block text-sm font-bold text-cyan-300 mb-3">Skills</label>
                    <div className="space-y-2">
                      {editData.skills && editData.skills.map((skill, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleArrayChange(e, 'skills', idx)}
                            className="flex-1 px-4 py-2 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 transition-all placeholder-gray-500"
                            placeholder="Skill"
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('skills', idx)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('skills')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-900 font-bold rounded-lg hover:from-cyan-400 hover:to-sky-400 transition-all duration-200 transform hover:scale-105"
                      >
                        + Add Skill
                      </button>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="animate-fade-in-up stagger-5">
                    <label className="block text-sm font-bold text-blue-300 mb-3">Languages</label>
                    <div className="space-y-2">
                      {editData.languages && editData.languages.map((lang, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={lang}
                            onChange={(e) => handleArrayChange(e, 'languages', idx)}
                            className="flex-1 px-4 py-2 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 transition-all placeholder-gray-500"
                            placeholder="Language"
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('languages', idx)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('languages')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all duration-200 transform hover:scale-105"
                      >
                        + Add Language
                      </button>
                    </div>
                  </div>

                  {/* Programming Languages */}
                  <div className="animate-fade-in-up stagger-6">
                    <label className="block text-sm font-bold text-purple-300 mb-3">Programming Languages</label>
                    <div className="space-y-2">
                      {editData.programmingLanguages && editData.programmingLanguages.map((lang, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={lang}
                            onChange={(e) => handleArrayChange(e, 'programmingLanguages', idx)}
                            className="flex-1 px-4 py-2 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 transition-all placeholder-gray-500"
                            placeholder="Programming Language"
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('programmingLanguages', idx)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('programmingLanguages')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-200 transform hover:scale-105"
                      >
                        + Add Programming Language
                      </button>
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div>
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Work Experience</label>
                    <textarea
                      name="workExperience"
                      value={editData.workExperience || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 transition-all h-24 resize-none placeholder-gray-500"
                      placeholder="Describe your work experience..."
                    />
                  </div>

                  {/* Extracurricular Activities */}
                  <div>
                    <label className="block text-sm font-bold text-orange-300 mb-2">Extracurricular Activities</label>
                    <div className="space-y-2">
                      {editData.extracurricularActivities && editData.extracurricularActivities.map((activity, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={activity}
                            onChange={(e) => handleArrayChange(e, 'extracurricularActivities', idx)}
                            className="flex-1 px-4 py-2 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 bg-slate-700 text-gray-200 placeholder-gray-500"
                            placeholder="Activity"
                          />
                          <button
                            onClick={() => handleRemoveArrayItem('extracurricularActivities', idx)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddArrayItem('extracurricularActivities')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-200 transform hover:scale-105"
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
