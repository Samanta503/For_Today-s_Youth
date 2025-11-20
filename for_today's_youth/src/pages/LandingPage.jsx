import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-cyan-50">
      {/* Hero Section - Energy Usage Card Inspired Theme */}
      <section className="pt-20 pb-32 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Main Card with Energy Usage Theme */}
            <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 rounded-3xl shadow-2xl p-12 text-white mb-12 relative overflow-hidden border border-blue-700">
              {/* Background Pattern - More vibrant */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 opacity-20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 opacity-15 rounded-full -ml-36 -mb-36 blur-3xl"></div>
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-sky-400 opacity-10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                {/* Month Display */}
                <div className="text-center mb-8">
                  <h2 className="text-sm text-cyan-300 uppercase tracking-widest mb-2 font-bold">Career Opportunity Platform</h2>
                  <h1 className="text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
                    Today's Potential
                  </h1>
                  <p className="text-cyan-200 text-xl font-medium">Your Gateway to Career Success</p>
                </div>

                {/* Stats Display */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-12 mb-12">
                  <div className="text-center bg-blue-900 bg-opacity-50 p-6 rounded-2xl border border-cyan-500 border-opacity-30 hover:border-cyan-400 transition-all">
                    <div className="text-sm text-cyan-300 mb-2 font-semibold">Suitable Jobs</div>
                    <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text mb-1">
                      150+
                    </div>
                    <div className="text-xs text-cyan-200">Based on Your Skills</div>
                  </div>
                  <div className="text-center bg-blue-900 bg-opacity-50 p-6 rounded-2xl border border-sky-500 border-opacity-30 hover:border-sky-400 transition-all">
                    <div className="text-sm text-sky-300 mb-2 font-semibold">Recommended Courses</div>
                    <div className="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text mb-1">
                      50+
                    </div>
                    <div className="text-xs text-sky-200">For Skill Enhancement</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
                  <Link
                    to="/signup"
                    className="px-8 py-4 text-lg bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-blue-900 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  >
                    Get Started Now →
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 text-lg border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-500 hover:bg-opacity-10 font-semibold rounded-lg transition-all"
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
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto font-medium">
              We guide you through every step of your career journey with personalized recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Feature 1 */}
            <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-cyan-500 hover:border-cyan-600">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Create Your Profile</h3>
              <p className="text-blue-700">
                Tell us about your education, experience, and career interests. We'll use this to provide personalized recommendations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-sky-50 to-blue-50 border-l-4 border-sky-500 hover:border-sky-600">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Get Job Recommendations</h3>
              <p className="text-blue-700">
                Discover 150+ job opportunities that match your qualifications and career aspirations perfectly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-cyan-50 to-sky-50 border-l-4 border-blue-500 hover:border-blue-600">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-sky-400 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Identify Skill Gaps</h3>
              <p className="text-blue-700">
                Know exactly which skills you need to develop and what qualifications will boost your career prospects.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 4 */}
            <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-sky-50 border-l-4 border-sky-500 hover:border-sky-600">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-400 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Learn From Courses</h3>
              <p className="text-blue-700">
                Access 50+ curated courses to develop the skills you need. If we don't have it, we'll guide you to external resources.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-cyan-50 to-blue-50 border-l-4 border-cyan-500 hover:border-cyan-600">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Track Your Progress</h3>
              <p className="text-blue-700">
                Monitor your skill development, course completions, and career readiness all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
            Why Choose For Today's Youth?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg hover:shadow-lg transition-all border-l-4 border-cyan-500">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Personalized Guidance</h3>
                <p className="text-blue-700">
                  Get recommendations tailored to your unique profile, not generic career advice.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg hover:shadow-lg transition-all border-l-4 border-sky-500">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Skill Development</h3>
                <p className="text-blue-700">
                  Access a comprehensive library of courses to build the skills employers want.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gradient-to-br from-cyan-50 to-sky-50 rounded-lg hover:shadow-lg transition-all border-l-4 border-blue-500">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">100% Free</h3>
                <p className="text-blue-700">
                  All recommendations and guidance are completely free for registered users.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg hover:shadow-lg transition-all border-l-4 border-sky-500">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-400 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Expert Resources</h3>
                <p className="text-blue-700">
                  External courses from Google, Coursera, Udemy, and more when needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
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
                className="inline-block px-8 py-4 text-lg bg-white text-cyan-900 hover:bg-cyan-50 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
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
