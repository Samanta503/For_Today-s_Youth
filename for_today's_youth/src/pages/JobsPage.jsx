import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  @keyframes borderGlow {
    0% {
      border-color: rgba(34, 211, 238, 0.3);
      box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.3);
    }
    50% {
      border-color: rgba(34, 211, 238, 0.8);
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.6);
    }
    100% {
      border-color: rgba(6, 182, 212, 1);
      box-shadow: 0 0 30px rgba(6, 182, 212, 0.8);
    }
  }
  .job-card {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  .job-card-hover:hover {
    animation: borderGlow 0.6s ease-out forwards;
  }
`;

export const JobsPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error('Please sign up to access jobs');
      navigate('/signup');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobsLoading(true);
        const jobsCollection = collection(db, 'Jobs');
        const querySnapshot = await getDocs(jobsCollection);
        
        const jobsData = [];
        querySnapshot.forEach((doc) => {
          const jobDoc = doc.data();
          console.log(`Job: ${doc.id}`, jobDoc); // Debug log to see all fields
          jobsData.push({
            id: doc.id,
            title: doc.id, // Job title from document name
            description: jobDoc.description || jobDoc.Description || '',
            salary: jobDoc.salary || jobDoc.Salary || '',
            requirements: jobDoc.requirements || jobDoc.Requirements || '',
            benefits: jobDoc.benefits || jobDoc.Benefits || '',
            ...jobDoc,
          });
        });

        console.log('All jobs loaded:', jobsData); // Debug log
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to load jobs');
      } finally {
        setJobsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated]);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || jobsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <style>{animationStyles}</style>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-cyan-300 font-semibold">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
      <style>{animationStyles}</style>
      
      {/* Header */}
      <div className="container mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
          Career Opportunities
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Explore exciting job opportunities curated for your career growth and success.
        </p>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto mb-12">
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search jobs by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 bg-gradient-to-r from-slate-800 to-blue-800 border-2 border-cyan-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 transition-all focus:ring-2 focus:ring-cyan-300/30"
          />
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="container mx-auto">
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                className="job-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card */}
                <div className="h-full bg-gradient-to-br from-slate-800 to-blue-800 rounded-xl overflow-hidden border-2 border-cyan-500 job-card-hover hover:shadow-2xl transition-all duration-300 flex flex-col">
                  {/* Header with Job Title */}
                  <div className="bg-gradient-to-r from-cyan-600 to-sky-600 p-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-pattern"></div>
                    <h3 className="text-2xl font-bold text-white relative z-10 line-clamp-2">
                      {job.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Salary */}
                    {job.salary && (
                      <div className="mb-6 pb-6 border-b border-cyan-500/30">
                        <p className="text-gray-400 text-sm mb-2">Salary Range</p>
                        <p className="text-2xl font-bold text-cyan-300">
                          {job.salary}
                        </p>
                      </div>
                    )}

                    {/* Description Preview */}
                    <div className="mb-6 flex-grow">
                      <p className="text-gray-300 text-sm line-clamp-4">
                        {job.description || 'No description available'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 border-t border-cyan-500/30 flex gap-3">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex-1 px-4 py-2 border-2 border-cyan-400 text-cyan-300 font-bold rounded-lg hover:bg-cyan-400 hover:text-blue-900 transition-all transform hover:scale-105 hover:border-cyan-300 duration-300"
                    >
                      View Details
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-blue-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 duration-300">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-300 text-xl">
              {searchTerm ? 'No jobs found matching your search.' : 'No jobs available at the moment.'}
            </p>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20 animate-slideInDown">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-sky-600 p-8 sticky top-0 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedJob.title}</h2>
                <p className="text-cyan-100 font-semibold">Job Details</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-white hover:text-gray-200 transition-colors text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Salary */}
              {selectedJob.salary && (
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-2">Salary Range</h3>
                  <p className="text-2xl font-bold text-sky-300">{selectedJob.salary}</p>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Job Overview</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedJob.description || 'No description available'}
                </p>
              </div>

              {/* Additional Fields */}
              {selectedJob.requirements && (
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">Requirements</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedJob.requirements}
                  </p>
                </div>
              )}

              {selectedJob.benefits && (
                <div>
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">Benefits</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedJob.benefits}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 border-t border-cyan-500/30 flex gap-4">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 px-4 py-3 border-2 border-cyan-400 text-cyan-300 font-bold rounded-lg hover:bg-cyan-400/10 transition-all transform hover:scale-105 duration-300"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-blue-900 font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 duration-300">
                  Sign in to Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
