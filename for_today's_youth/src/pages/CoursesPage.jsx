import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  @keyframes buttonGlow {
    0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
    50% { box-shadow: 0 0 15px rgba(34, 211, 238, 0.6); }
    100% { box-shadow: 0 0 25px rgba(6, 182, 212, 0.8); }
  }
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

export const CoursesPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesCollection = collection(db, 'Courses');
        const coursesSnapshot = await getDocs(coursesCollection);
        
        const coursesList = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.id,
          courseDetail: doc.data(),
          ...doc.data(),
        }));

        setCourses(coursesList);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

  // Handle enroll button
  const handleEnroll = () => {
    if (isAuthenticated) {
      toast.success('You are already enrolled!');
    } else {
      navigate('/signup');
    }
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

          {/* Courses Grid */}
          {!loading && courses.length > 0 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className={`animate-fade-in-up stagger-${(index % 6) + 1} bg-gradient-to-br from-slate-800 to-blue-800 rounded-2xl shadow-2xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-cyan-500 card-hover cursor-pointer`}
                    onClick={() => handleLearnMore(course)}
                  >
                    {/* Course Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-cyan-600 to-slate-700">
                      {getCourseImage(course.name) ? (
                        <img
                          src={getCourseImage(course.name)}
                          alt={course.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 opacity-90"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-slate-700">
                          <div className="text-center">
                            <svg className="w-16 h-16 text-cyan-200 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                            </svg>
                            <p className="text-cyan-100 font-semibold">No Image</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Course Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-cyan-300 mb-3 line-clamp-2 hover:text-sky-300 transition-all">
                        {course.name}
                      </h3>

                      {course.courseDetail?.Description && (
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2 font-medium">
                          {course.courseDetail.Description}
                        </p>
                      )}

                      <div className="flex gap-4 mb-6 text-sm flex-wrap">
                        {course.courseDetail?.['Course fee'] && (
                          <div className="flex items-center gap-2 text-cyan-300 bg-cyan-500 bg-opacity-10 px-3 py-2 rounded-full font-semibold border border-cyan-500 border-opacity-30">
                            <span>💰 {course.courseDetail['Course fee']}</span>
                          </div>
                        )}

                        {course.courseDetail?.Schedule && (
                          <div className="flex items-center gap-2 text-sky-300 bg-sky-500 bg-opacity-10 px-3 py-2 rounded-full font-semibold border border-sky-500 border-opacity-30">
                            <span>📅 {course.courseDetail.Schedule}</span>
                          </div>
                        )}
                      </div>

                      <button
                        className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-900 font-bold rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg button-hover"
                        onClick={() => handleLearnMore(course)}
                      >
                        Learn More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && courses.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-cyan-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m0 0h6m0-6H6m0 0H0"
                />
              </svg>
              <h3 className="text-2xl font-bold text-blue-200 mb-2">No Courses Available</h3>
              <p className="text-blue-300">Please check back later for new courses.</p>
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
              className="bg-gradient-to-b from-slate-800 to-blue-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto animate-scale-in pointer-events-auto border-2 border-cyan-500"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 p-8 flex items-center justify-between sticky top-0 z-10 shadow-lg border-b-2 border-cyan-400">
                <h2 className="text-3xl font-bold text-cyan-300">{selectedCourse.name}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-cyan-300 hover:bg-cyan-300 hover:bg-opacity-20 rounded-full p-2 transition-all"
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
                    className="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg border-4 border-cyan-500"
                  />
                )}

                {/* Course Details */}
                {selectedCourse.courseDetail && Object.keys(selectedCourse.courseDetail).length > 0 ? (
                  <div className="space-y-6">
                    {/* Description */}
                    {selectedCourse.courseDetail.Description && (
                      <div className="bg-gradient-to-r from-cyan-900 to-blue-900 p-6 rounded-xl border-l-4 border-cyan-500">
                        <h3 className="text-2xl font-bold text-cyan-300 mb-3">About This Course</h3>
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {selectedCourse.courseDetail.Description}
                        </p>
                      </div>
                    )}

                    {/* Course Fee & Schedule */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCourse.courseDetail['Course fee'] && (
                        <div className="bg-gradient-to-br from-cyan-900 to-blue-900 p-6 rounded-xl border-l-4 border-cyan-600 shadow-md hover:shadow-lg transition-shadow">
                          <p className="text-sm text-cyan-400 font-bold uppercase tracking-wide mb-2">💰 Course Fee</p>
                          <p className="text-2xl font-bold text-cyan-300">
                            {selectedCourse.courseDetail['Course fee']}
                          </p>
                        </div>
                      )}
                      {selectedCourse.courseDetail.Schedule && (
                        <div className="bg-gradient-to-br from-sky-900 to-blue-900 p-6 rounded-xl border-l-4 border-sky-600 shadow-md hover:shadow-lg transition-shadow">
                          <p className="text-sm text-sky-400 font-bold uppercase tracking-wide mb-2">📅 Schedule</p>
                          <p className="text-sky-300 font-semibold leading-relaxed">
                            {selectedCourse.courseDetail.Schedule}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Objectives */}
                    {selectedCourse.courseDetail.Objectives && (
                      <div>
                        <h4 className="font-bold text-cyan-300 mb-3">Course Objectives</h4>
                        <ul className="space-y-2">
                          {Array.isArray(selectedCourse.courseDetail.Objectives) ? (
                            selectedCourse.courseDetail.Objectives.map((objective, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-300">
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
                            <li className="flex items-start gap-3 text-gray-300">
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
                        <h4 className="font-bold text-cyan-300 mb-3">Prerequisites</h4>
                        <ul className="space-y-2">
                          {Array.isArray(selectedCourse.courseDetail.Prerequisites) ? (
                            selectedCourse.courseDetail.Prerequisites.map((prereq, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-300">
                                <svg className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385A7.968 7.968 0 009 4.804z" />
                                </svg>
                                <span>{prereq}</span>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-start gap-3 text-gray-300">
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
                        <h4 className="font-bold text-cyan-300 mb-3">Key Learning Points</h4>
                        <ul className="space-y-2">
                          {Array.isArray(selectedCourse.courseDetail['Key Learning Points']) ? (
                            selectedCourse.courseDetail['Key Learning Points'].map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-300">
                                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                            <li className="flex items-start gap-3 text-gray-300">
                              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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

                    {/* Enrollment Button */}
                    <button
                      onClick={handleEnroll}
                      className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-900 font-bold text-lg rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl button-hover mt-8"
                    >
                      {isAuthenticated ? 'Already Enrolled ✓' : 'Enroll Now ✨'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-300">No course details available</p>
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
