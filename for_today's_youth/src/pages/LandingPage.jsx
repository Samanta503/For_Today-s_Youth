import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  @keyframes fadeInDown {
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
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .animate-fade-in-down {
    animation: fadeInDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .animate-slide-in-left {
    animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .animate-slide-in-right {
    animation: slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .stagger-1 { animation-delay: 0.05s; }
  .stagger-2 { animation-delay: 0.1s; }
  .stagger-3 { animation-delay: 0.15s; }
  .stagger-4 { animation-delay: 0.2s; }
  .stagger-5 { animation-delay: 0.25s; }
`;

export const LandingPage = () => {
  const { user, userProfile } = useAuth();

  // If user is logged in, show personalized content
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <style>{animationStyles}</style>
        
        {/* Welcome Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-slate-800 via-blue-800 to-slate-800 rounded-3xl shadow-2xl p-12 text-white mb-12 relative overflow-hidden border border-cyan-500 border-opacity-30 animate-fade-in-up transition-all duration-500 hover:shadow-cyan-500/50 hover:shadow-2xl hover:border-cyan-400 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 opacity-20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 opacity-15 rounded-full -ml-36 -mb-36 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-sky-400 opacity-10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="text-center mb-8 animate-fade-in-down stagger-1">
                    <h2 className="text-sm text-cyan-300 uppercase tracking-widest mb-2 font-bold">Welcome Back</h2>
                    <h1 className="text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500">
                      {userProfile?.fullName || user?.email?.split('@')[0]}
                    </h1>
                    <p className="text-cyan-200 text-xl font-medium">Continue Your Career Development Journey</p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 mb-12">
                    <div className="text-center bg-blue-900 bg-opacity-50 p-6 rounded-2xl border border-cyan-500 border-opacity-30 hover:border-cyan-400 transition-all duration-500 animate-slide-in-left stagger-2 hover:scale-102 hover:shadow-lg hover:shadow-cyan-500/50 hover:-translate-y-1">
                      <div className="text-sm text-cyan-300 mb-2 font-semibold">Your Profile</div>
                      <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text mb-1">
                        ✓
                      </div>
                      <div className="text-xs text-cyan-200">Complete & Ready</div>
                    </div>
                    <div className="text-center bg-blue-900 bg-opacity-50 p-6 rounded-2xl border border-sky-500 border-opacity-30 hover:border-sky-400 transition-all duration-500 animate-slide-in-right stagger-3 hover:scale-102 hover:shadow-lg hover:shadow-sky-500/50 hover:-translate-y-1">
                      <div className="text-sm text-sky-300 mb-2 font-semibold">Matched Jobs</div>
                      <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text mb-1">
                        {Math.floor(Math.random() * 80) + 50}
                      </div>
                      <div className="text-xs text-sky-200">Waiting for You</div>
                    </div>
                    <div className="text-center bg-blue-900 bg-opacity-50 p-6 rounded-2xl border border-blue-500 border-opacity-30 hover:border-blue-400 transition-all duration-500 stagger-4 hover:scale-102 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1">
                      <div className="text-sm text-blue-300 mb-2 font-semibold">Next Step</div>
                      <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-sky-300 bg-clip-text mb-1">
                        📚
                      </div>
                      <div className="text-xs text-blue-200">Explore Courses</div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="flex flex-col md:flex-row gap-4 justify-center mt-12 animate-fade-in-up stagger-5">
                    <Link
                      to="/jobs"
                      className="px-8 py-4 text-lg bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-xl hover:shadow-cyan-400/50 transform hover:-translate-y-1 hover:scale-102 transition-all duration-300 active:scale-98"
                    >
                      View Job Matches →
                    </Link>
                    <Link
                      to="/courses"
                      className="px-8 py-4 text-lg border-2 border-sky-300 text-sky-300 hover:bg-sky-500 hover:bg-opacity-10 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-1 hover:border-sky-200 active:scale-98"
                    >
                      Explore Courses
                    </Link>
                    <Link
                      to="/profile"
                      className="px-8 py-4 text-lg border-2 border-blue-300 text-blue-300 hover:bg-blue-500 hover:bg-opacity-10 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 hover:border-blue-200 active:scale-98"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Features Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent mb-4">
                Your Dashboard
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
                Everything you need to advance your career in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="card card-hover hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-slate-800 to-blue-800 border-l-4 border-cyan-500 rounded-lg p-6 hover:scale-102">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-sky-400 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15a23.931 23.931 0 01-9-1.745M12 9a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-cyan-300 mb-3">Personalized Matches</h3>
                <p className="text-gray-300">
                  AI-powered job and course recommendations based on your unique profile and skills.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card card-hover hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-800 to-slate-800 border-l-4 border-sky-500 rounded-lg p-6 hover:scale-102">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-sky-300 mb-3">Track Progress</h3>
                <p className="text-gray-300">
                  Monitor your skill development, course completions, and career readiness improvements.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card card-hover hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-slate-800 to-blue-800 border-l-4 border-blue-500 rounded-lg p-6 hover:scale-102">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-sky-400 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-300 mb-3">Quick Access</h3>
                <p className="text-gray-300">
                  Fast navigation to jobs, courses, and resources handpicked for your career goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Next Steps */}
        <section className="py-20 px-4 bg-gradient-to-b from-blue-900 to-slate-900">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-blue-900 via-cyan-800 to-sky-900 rounded-3xl p-12 text-white text-center relative overflow-hidden border border-cyan-500 border-opacity-30 shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400 opacity-10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-400 opacity-10 rounded-full -ml-30 -mb-30 blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
                  Ready to Level Up?
                </h2>
                <p className="text-xl text-cyan-200 mb-8 max-w-2xl mx-auto font-medium">
                  Start exploring job opportunities that match your skills and discover courses to fill any gaps.
                </p>
                <Link
                  to="/jobs"
                  className="inline-block px-8 py-4 text-lg bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-900 hover:from-cyan-300 hover:to-sky-300 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  Start Exploring →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Original landing page for non-logged-in users
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <style>{animationStyles}</style>
      {/* Hero Section - Energy Usage Card Inspired Theme */}
      <section className="pt-20 pb-32 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Main Card with Energy Usage Theme */}
            <div className="bg-gradient-to-br from-slate-800 via-blue-800 to-slate-800 rounded-3xl shadow-2xl p-12 text-white mb-12 relative overflow-hidden border border-cyan-500 border-opacity-30 animate-fade-in-up transition-all duration-500 hover:shadow-cyan-500/50 hover:shadow-2xl hover:border-cyan-400 hover:-translate-y-1">
              {/* Background Pattern - More vibrant */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 opacity-20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 opacity-15 rounded-full -ml-36 -mb-36 blur-3xl"></div>
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-sky-400 opacity-10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                {/* Month Display */}
                <div className="text-center mb-8 animate-fade-in-down stagger-1">
                  <h2 className="text-sm text-cyan-300 uppercase tracking-widest mb-2 font-bold">Career Opportunity Platform</h2>
                  <h1 className="text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500">
                    Today's Potential
                  </h1>
                  <p className="text-cyan-200 text-xl font-medium">Your Gateway to Career Success</p>
                </div>

                {/* Stats Display */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-12 mb-12">
                  <div className="text-center bg-blue-900 bg-opacity-50 p-6 rounded-2xl border border-cyan-500 border-opacity-30 hover:border-cyan-400 transition-all duration-500 animate-slide-in-left stagger-2 hover:scale-102 hover:shadow-lg hover:shadow-cyan-500/50 hover:-translate-y-1">
                    <div className="text-sm text-cyan-300 mb-2 font-semibold animate-pulse">Suitable Jobs</div>
                    <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text mb-1 transition-transform duration-300">
                      150+
                    </div>
                    <div className="text-xs text-cyan-200">Based on Your Skills</div>
                  </div>
                  <div className="text-center bg-blue-900 bg-opacity-50 p-6 rounded-2xl border border-sky-500 border-opacity-30 hover:border-sky-400 transition-all duration-500 animate-slide-in-right stagger-3 hover:scale-102 hover:shadow-lg hover:shadow-sky-500/50 hover:-translate-y-1">
                    <div className="text-sm text-sky-300 mb-2 font-semibold animate-pulse">Recommended Courses</div>
                    <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text mb-1 transition-transform duration-300">
                      50+
                    </div>
                    <div className="text-xs text-sky-200">For Skill Enhancement</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center mt-12 animate-fade-in-up stagger-4">
                  <Link
                    to="/signup"
                    className="px-8 py-4 text-lg bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-900 font-bold rounded-lg shadow-lg hover:shadow-xl hover:shadow-cyan-400/50 transform hover:-translate-y-1 hover:scale-102 transition-all duration-300 active:scale-98"
                  >
                    Get Started Now →
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 text-lg border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-500 hover:bg-opacity-10 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 hover:border-cyan-200 active:scale-98"
                  >
                    I'm Already a Member
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
              We guide you through every step of your career journey with personalized recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Feature 1 */}
            <div className="card card-hover hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-slate-800 to-blue-800 border-l-4 border-cyan-500 rounded-lg p-6 hover:scale-102">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-sky-400 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-cyan-300 mb-3">Create Your Profile</h3>
              <p className="text-gray-300">
                Tell us about your education, experience, and career interests. We'll use this to provide personalized recommendations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card card-hover hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-800 to-slate-800 border-l-4 border-sky-500 rounded-lg p-6 hover:scale-102">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-sky-300 mb-3">Get Job Recommendations</h3>
              <p className="text-gray-300">
                Discover 150+ job opportunities that match your qualifications and career aspirations perfectly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card card-hover hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-slate-800 to-blue-800 border-l-4 border-blue-500 rounded-lg p-6 hover:scale-102">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-sky-400 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-300 mb-3">Identify Skill Gaps</h3>
              <p className="text-gray-300">
                Know exactly which skills you need to develop and what qualifications will boost your career prospects.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 4 */}
            <div className="card card-hover hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-800 to-slate-800 border-l-4 border-sky-500 rounded-lg p-6 hover:scale-102">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-400 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-sky-300 mb-3">Learn From Courses</h3>
              <p className="text-gray-300">
                Access 50+ curated courses to develop the skills you need. If we don't have it, we'll guide you to external resources.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card card-hover hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-slate-800 to-blue-800 border-l-4 border-cyan-500 rounded-lg p-6 hover:scale-102">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-sky-400 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-cyan-300 mb-3">Track Your Progress</h3>
              <p className="text-gray-300">
                Monitor your skill development, course completions, and career readiness all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent">
            Why Choose For Today's Youth?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="flex gap-4 p-6 bg-gradient-to-br from-slate-800 to-blue-800 rounded-lg card-hover hover:shadow-lg transition-all border-l-4 border-cyan-500">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-sky-400 text-slate-900 flex items-center justify-center font-bold text-xl shadow-lg">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-2">Personalized Guidance</h3>
                <p className="text-gray-300">
                  Get recommendations tailored to your unique profile, not generic career advice.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-800 to-slate-800 rounded-lg card-hover hover:shadow-lg transition-all border-l-4 border-sky-500">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-cyan-400 text-slate-900 flex items-center justify-center font-bold text-xl shadow-lg">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-sky-300 mb-2">Skill Development</h3>
                <p className="text-gray-300">
                  Access a comprehensive library of courses to build the skills employers want.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gradient-to-br from-slate-800 to-blue-800 rounded-lg card-hover hover:shadow-lg transition-all border-l-4 border-blue-500">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-sky-400 text-slate-900 flex items-center justify-center font-bold text-xl shadow-lg">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-300 mb-2">100% Free</h3>
                <p className="text-gray-300">
                  All recommendations and guidance are completely free for registered users.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-800 to-slate-800 rounded-lg card-hover hover:shadow-lg transition-all border-l-4 border-sky-500">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-400 text-slate-900 flex items-center justify-center font-bold text-xl shadow-lg">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-sky-300 mb-2">Expert Resources</h3>
                <p className="text-gray-300">
                  External courses from Google, Coursera, Udemy, and more when needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-900 to-slate-900">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-900 via-cyan-800 to-sky-900 rounded-3xl p-12 text-white text-center relative overflow-hidden border border-cyan-500 border-opacity-30 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400 opacity-10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-400 opacity-10 rounded-full -ml-30 -mb-30 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
                Ready to Start Your Career Journey?
              </h2>
              <p className="text-xl text-cyan-200 mb-8 max-w-2xl mx-auto font-medium">
                Join thousands of youth discovering their perfect career path with personalized guidance.
              </p>
              <Link
                to="/signup"
                    className="inline-block px-8 py-4 text-lg bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-900 hover:from-cyan-300 hover:to-sky-300 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Get Started Today →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
