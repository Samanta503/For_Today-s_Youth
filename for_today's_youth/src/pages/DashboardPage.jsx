import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Import course images
import AIImage from '../assets/images/AI Engineering.jpg';
import AppImage from '../assets/images/App Development.jpg';
import CompetitiveImage from '../assets/images/Competitive Programming.jpg';
import DigitalMarketingImage from '../assets/images/Digital Marketing & Social Media Strategy.jpg';
import EntrepreneurshipImage from '../assets/images/Entrepreneurship & New Venture Creation.jpg';
import WebImage from '../assets/images/Web Development.jpg';

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
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
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
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  .animate-slide-in-down {
    animation: slideInDown 0.6s ease-out forwards;
  }
  .animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
  }
  .animate-scale-in {
    animation: scaleIn 0.4s ease-out forwards;
  }
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
  .stagger-6 { animation-delay: 0.6s; }
  @keyframes borderGlow {
    0% { border-color: rgba(34, 211, 238, 0.3); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.3); }
    50% { border-color: rgba(34, 211, 238, 0.8); box-shadow: 0 0 20px rgba(34, 211, 238, 0.6); }
    100% { border-color: rgba(6, 182, 212, 1); box-shadow: 0 0 30px rgba(6, 182, 212, 0.8); }
  }
  @keyframes borderGlowGreen {
    0% { border-color: rgba(34, 197, 94, 0.3); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.3); }
    50% { border-color: rgba(34, 197, 94, 0.8); box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); }
    100% { border-color: rgba(22, 163, 74, 1); box-shadow: 0 0 30px rgba(22, 163, 74, 0.8); }
  }
  @keyframes buttonGlow {
    0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
    50% { box-shadow: 0 0 15px rgba(34, 211, 238, 0.6); }
    100% { box-shadow: 0 0 25px rgba(6, 182, 212, 0.8); }
  }
  @keyframes buttonGlowGreen {
    0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
    50% { box-shadow: 0 0 15px rgba(34, 197, 94, 0.6); }
    100% { box-shadow: 0 0 25px rgba(22, 163, 74, 0.8); }
  }
  .card-hover-green:hover { animation: borderGlowGreen 0.6s ease-out forwards; }
  .button-hover-green:hover { animation: buttonGlowGreen 0.6s ease-out forwards; }
  .card-hover:hover { animation: borderGlow 0.6s ease-out forwards; }
  .button-hover:hover { animation: buttonGlow 0.6s ease-out forwards; }
`;

// Mapping of course names to images
const courseImageMap = {
  'AI Engineering': AIImage,
  'Web Development': WebImage,
  'App Development': AppImage,
  'Competitive Programming': CompetitiveImage,
  'Digital Marketing & Social Media Strategy': DigitalMarketingImage,
  'Entrepreneurship & New Venture Creation': EntrepreneurshipImage,
};

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch courses and match with user career interests
  useEffect(() => {
    const fetchCoursesAndRecommendations = async () => {
      try {
        setLoading(true);
        
        // Fetch all courses
        const coursesCollection = collection(db, 'Courses');
        const coursesSnapshot = await getDocs(coursesCollection);
        
        const coursesList = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.id,
          courseDetail: doc.data(),
          ...doc.data(),
        }));

        // Fetch user's career interests if user is logged in
        if (user && user.email) {
          const userDocRef = doc(db, 'Users', user.email);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const careerInterests = userData.careerInterests || '';
            
            console.log('User Career Interests:', careerInterests);
            console.log('Available Courses:', coursesList.map(c => c.name));

            // Match career interests with course names
            if (careerInterests) {
              const interestKeywords = careerInterests.toLowerCase().split(/[\s,&]+/).filter(k => k.length > 0);
              
              const recommended = coursesList.filter(course => {
                const courseName = course.name.toLowerCase();
                
                // Check if any interest keyword is in the course name
                return interestKeywords.some(keyword => 
                  courseName.includes(keyword)
                );
              });

              setRecommendedCourses(recommended);
              console.log('Recommended courses:', recommended);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndRecommendations();
  }, [user]);

  // Handle learn more click
  const handleLearnMore = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  // Get image for course
  const getCourseImage = (courseName) => {
    return courseImageMap[courseName] || null;
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 text-center animate-slide-in-down">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Discover a wide range of career-focused courses designed to help you succeed in today's competitive world.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 animate-spin">
                  <div className="h-14 w-14 rounded-full bg-slate-900"></div>
                </div>
                <p className="text-blue-200 text-lg">Loading courses...</p>
              </div>
            </div>
          )}

          {/* Recommended Courses Section */}
          {!loading && recommendedCourses.length > 0 && (
            <div className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-green-300 mb-2 flex items-center gap-2">
                  <span className="text-3xl">🎯</span> Recommended For You
                </h2>
                <p className="text-green-100">Based on your career interest: <span className="font-bold text-green-200">{recommendedCourses.length > 0 ? "Great matches found!" : ""}</span></p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedCourses.map((course, index) => {
                  // Get enrollment count from course data
                  const enrollmentCount = course.courseDetail?.['Number of Students'] || '7';
                  
                  return (
                    <div
                      key={course.id}
                      className={`animate-fade-in-up stagger-${(index % 6) + 1} bg-gradient-to-b from-slate-800 to-blue-900 rounded-3xl shadow-2xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-500 card-hover-green relative cursor-pointer group`}
                    >
                      {/* Recommended Badge */}
                      <div className="absolute top-4 right-4 z-20 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ✓ Recommended
                      </div>

                      {/* Course Image Container */}
                      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-green-600 to-slate-700">
                        {getCourseImage(course.name) ? (
                          <img
                            src={getCourseImage(course.name)}
                            alt={course.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-600 to-slate-700">
                            <div className="text-center">
                              <svg className="w-16 h-16 text-green-200 mx-auto mb-2 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-bold text-white line-clamp-2">
                            {course.name}
                          </h3>
                        </div>
                      </div>

                      {/* Course Info Section */}
                      <div className="p-6 space-y-4">
                        {/* Enrollment Count */}
                        <div className="flex items-center gap-3 text-green-300">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                            </svg>
                          </div>
                          <span className="font-semibold">{enrollmentCount} students enrolled</span>
                        </div>

                        {/* Instructor/Creator */}
                        {course.courseDetail?.Instructor && (
                          <div className="text-green-200 text-sm font-medium">
                            <p className="text-gray-400">By</p>
                            <p className="text-green-300">{course.courseDetail.Instructor}</p>
                          </div>
                        )}

                        {/* Course Overview Section */}
                        {course.courseDetail?.Description && (
                          <div>
                            <h4 className="text-green-300 font-bold text-sm mb-2">Course Overview</h4>
                            <p className="text-gray-300 text-sm line-clamp-2">
                              {course.courseDetail.Description}
                            </p>
                          </div>
                        )}

                        {/* Course Outline/Key Details */}
                        {course.courseDetail?.['Course fee'] && (
                          <div>
                            <h4 className="text-green-300 font-bold text-sm mb-2">Course Outline</h4>
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                              <p className="text-green-200 text-sm font-medium">{course.courseDetail['Course fee']}</p>
                            </div>
                          </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => handleLearnMore(course)}
                            className="flex-1 py-3 px-4 border-2 border-green-500 text-green-300 font-bold rounded-xl hover:border-green-400 hover:text-green-200 hover:bg-green-500/10 transition-all duration-200 card-hover-green"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => navigate('/signup')}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg button-hover-green"
                          >
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}


        </div>

        {/* Modal Backdrop */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
            onClick={handleCloseModal}
          ></div>
        )}

        {/* Modal */}
        {showModal && selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-gradient-to-b from-slate-800 to-blue-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto animate-scale-in pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 p-8 flex items-center justify-between sticky top-0 z-10 shadow-lg border-b-2 border-cyan-400">
                <h2 className="text-3xl font-bold text-white">{selectedCourse.name}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Course Image */}
                {getCourseImage(selectedCourse.name) && (
                  <img
                    src={getCourseImage(selectedCourse.name)}
                    alt={selectedCourse.name}
                    className="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg border-4 border-cyan-500/50"
                  />
                )}

                {/* Course Details */}
                {selectedCourse.courseDetail && Object.keys(selectedCourse.courseDetail).length > 0 ? (
                  <div className="space-y-6">
                    {/* Enrollment Count */}
                    <div className="flex items-center gap-3 text-cyan-300">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-lg">{selectedCourse.courseDetail?.['Number of Students'] || '7'} students enrolled</span>
                    </div>

                    {/* Description */}
                    {selectedCourse.courseDetail.Description && (
                      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-xl border-l-4 border-cyan-500">
                        <h3 className="text-2xl font-bold text-cyan-300 mb-3">Course Overview</h3>
                        <p className="text-blue-100 leading-relaxed text-base">
                          {selectedCourse.courseDetail.Description}
                        </p>
                      </div>
                    )}

                    {/* Course Fee & Schedule */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCourse.courseDetail['Course fee'] && (
                        <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 p-6 rounded-xl border-l-4 border-cyan-500 shadow-md hover:shadow-lg transition-shadow">
                          <p className="text-sm text-cyan-300 font-bold uppercase tracking-wide mb-2">💰 Course Fee</p>
                          <p className="text-2xl font-bold text-cyan-100">
                            {selectedCourse.courseDetail['Course fee']}
                          </p>
                        </div>
                      )}
                      {selectedCourse.courseDetail.Schedule && (
                        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 p-6 rounded-xl border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow">
                          <p className="text-sm text-blue-300 font-bold uppercase tracking-wide mb-2">📅 Schedule</p>
                          <p className="text-cyan-100 font-semibold leading-relaxed">
                            {selectedCourse.courseDetail.Schedule}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Course Outline */}
                    {selectedCourse.courseDetail['Course Outline'] && (
                      <div>
                        <h4 className="font-bold text-cyan-300 mb-3 text-lg">Course Outline</h4>
                        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4">
                          <p className="text-blue-100">
                            {Array.isArray(selectedCourse.courseDetail['Course Outline']) ? 
                              selectedCourse.courseDetail['Course Outline'].join(', ') : 
                              selectedCourse.courseDetail['Course Outline']}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Objectives */}
                    {selectedCourse.courseDetail.Objectives && (
                      <div>
                        <h4 className="font-bold text-cyan-300 mb-3 text-lg">Course Objectives</h4>
                        <ul className="space-y-2">
                          {Array.isArray(selectedCourse.courseDetail.Objectives) ? (
                            selectedCourse.courseDetail.Objectives.map((objective, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-blue-100">
                                <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{objective}</span>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-start gap-3 text-blue-100">
                              <svg className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{selectedCourse.courseDetail.Objectives}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Prerequisites */}
                    {selectedCourse.courseDetail.Prerequisites && (
                      <div>
                        <h4 className="font-bold text-cyan-300 mb-3 text-lg">Prerequisites</h4>
                        <ul className="space-y-2">
                          {Array.isArray(selectedCourse.courseDetail.Prerequisites) ? (
                            selectedCourse.courseDetail.Prerequisites.map((prereq, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-blue-100">
                                <svg className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385A7.968 7.968 0 009 4.804z" />
                                </svg>
                                <span>{prereq}</span>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-start gap-3 text-blue-100">
                              <svg className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385A7.968 7.968 0 009 4.804z" />
                              </svg>
                              <span>{selectedCourse.courseDetail.Prerequisites}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Key Learning Points */}
                    {selectedCourse.courseDetail['Key Learning Points'] && (
                      <div>
                        <h4 className="font-bold text-cyan-300 mb-3 text-lg">Key Learning Points</h4>
                        <ul className="space-y-2">
                          {Array.isArray(selectedCourse.courseDetail['Key Learning Points']) ? (
                            selectedCourse.courseDetail['Key Learning Points'].map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-blue-100">
                                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 10.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{point}</span>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-start gap-3 text-blue-100">
                              <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 10.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{selectedCourse.courseDetail['Key Learning Points']}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleCloseModal}
                        className="flex-1 py-4 px-6 border-2 border-cyan-500/50 text-cyan-300 font-bold rounded-xl hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10 transition-all duration-200"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => navigate('/signup')}
                        className="flex-1 py-4 px-6 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-cyan-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-cyan-500/50"
                      >
                        Sign in to Enroll
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-blue-200">No course details available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
