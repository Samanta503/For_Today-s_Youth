import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Helper function to parse skills from string format
const parseSkills = (skillsData) => {
  if (!skillsData) return [];
  
  // If it's already an array, return it
  if (Array.isArray(skillsData)) {
    return skillsData;
  }
  
  // If it's a string, try to parse it
  if (typeof skillsData === 'string') {
    // Try to split by common delimiters or patterns
    // Pattern 1: "1.Skill 2.Skill 3.Skill"
    const numberedMatch = skillsData.match(/\d+\.\s*([^0-9.]+)/g);
    if (numberedMatch) {
      return numberedMatch.map(item => item.replace(/^\d+\.\s*/, '').trim());
    }
    
    // Pattern 2: Comma-separated
    if (skillsData.includes(',')) {
      return skillsData.split(',').map(s => s.trim()).filter(s => s);
    }
    
    // Pattern 3: Return as single skill if no delimiters found
    return [skillsData.trim()];
  }
  
  return [];
};

const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
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
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  .job-card {
    animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }
  .job-card-hover {
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .job-card-hover:hover {
    animation: cardLift 0.5s ease-out forwards, borderGlow 0.8s ease-out forwards;
    filter: drop-shadow(0 20px 40px rgba(6, 182, 212, 0.3));
  }
  .job-header {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(34, 211, 238, 0.1) 100%);
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .job-card-hover:hover .job-header {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(34, 211, 238, 0.2) 100%);
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
            description: jobDoc.Description || jobDoc.description || '',
            salary: jobDoc.Salary || jobDoc.salary || '',
            experienceLevel: jobDoc['Experience Level'] || jobDoc.experienceLevel || jobDoc['experience level'] || '',
            skills: jobDoc.Skills || jobDoc.skills || '',
            requirements: jobDoc.Requirements || jobDoc.requirements || '',
            benefits: jobDoc.Benefits || jobDoc.benefits || '',
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
            className="w-full px-6 py-3 bg-gradient-to-r from-slate-950 to-blue-950 border-2 border-cyan-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300 focus:ring-2 focus:ring-cyan-400/30 backdrop-blur-md"
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
                <div className="h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 rounded-xl overflow-hidden border-2 border-cyan-600 job-card-hover hover:shadow-2xl transition-all duration-500 flex flex-col backdrop-blur-md bg-opacity-80">
                  {/* Header with Job Title */}
                  <div className="job-header bg-gradient-to-r from-blue-950 to-slate-950 p-6 relative overflow-hidden border-b border-cyan-500/30">
                    <div className="absolute inset-0 opacity-10 bg-pattern"></div>
                    <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text relative z-10 line-clamp-2">
                      {job.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Experience Level */}
                    {job.experienceLevel && (
                      <div className="mb-4 pb-4 border-b border-cyan-500/20">
                        <p className="text-gray-400 text-xs mb-1 font-medium uppercase tracking-wide">Experience Level</p>
                        <p className="text-sm font-semibold text-cyan-300">{job.experienceLevel}</p>
                      </div>
                    )}

                    {/* Salary */}
                    {job.salary && (
                      <div className="mb-4 pb-4 border-b border-cyan-500/20 transition-all duration-300">
                        <p className="text-gray-400 text-xs mb-1 font-medium uppercase tracking-wide">Salary Range</p>
                        <p className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                          {job.salary}
                        </p>
                      </div>
                    )}

                    {/* Skills */}
                    {job.skills && (
                      <div className="mb-4 pb-4 border-b border-cyan-500/20">
                        <p className="text-gray-400 text-xs mb-3 font-medium uppercase tracking-wide">Required Skills</p>
                        <ul className="space-y-2">
                          {parseSkills(job.skills).map((skill, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start">
                              <span className="text-cyan-400 font-bold mr-2">{idx + 1}.</span>
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Description Preview */}
                    <div className="mb-6 flex-grow transition-all duration-300">
                      <p className="text-gray-300 text-xs line-clamp-3 leading-relaxed">
                        {job.description || 'No description available'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 border-t border-cyan-500/20 flex gap-3 transition-all duration-300">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex-1 px-4 py-2 border-2 border-cyan-500 text-cyan-300 font-bold rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400 transition-all transform hover:scale-105 duration-300 backdrop-blur-sm"
                    >
                      View Details
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-blue-950 font-bold rounded-lg shadow-lg hover:shadow-cyan-600/60 transition-all transform hover:scale-105 duration-300 backdrop-blur-sm">
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
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-cyan-600 shadow-2xl shadow-cyan-600/30 backdrop-blur-md">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-950 to-slate-950 p-8 sticky top-0 flex justify-between items-start border-b border-cyan-500/30">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent mb-2">{selectedJob.title}</h2>
                <p className="text-cyan-300/80 font-semibold text-sm">Job Details</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300 text-3xl font-bold hover:scale-110 transform"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Experience Level */}
              {selectedJob.experienceLevel && (
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/20">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">Experience Level</h3>
                  <p className="text-lg font-semibold text-purple-300">{selectedJob.experienceLevel}</p>
                </div>
              )}

              {/* Salary */}
              {selectedJob.salary && (
                <div className="bg-gradient-to-r from-cyan-500/10 to-sky-500/10 p-4 rounded-lg border border-cyan-500/20 transition-all duration-300">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent mb-2">Salary Range</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">{selectedJob.salary}</p>
                </div>
              )}

              {/* Skills */}
              {selectedJob.skills && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-3">Required Skills</h3>
                  <ul className="space-y-2">
                    {parseSkills(selectedJob.skills).map((skill, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start">
                        <span className="text-green-400 font-bold mr-3">{idx + 1}.</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <div className="bg-gradient-to-r from-slate-900/50 to-blue-900/50 p-4 rounded-lg border border-cyan-500/20">
                <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent mb-3">Job Overview</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedJob.description || 'No description available'}
                </p>
              </div>

              {/* Additional Fields */}
              {selectedJob.requirements && (
                <div className="bg-gradient-to-r from-slate-900/50 to-blue-900/50 p-4 rounded-lg border border-cyan-500/20">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent mb-3">Requirements</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedJob.requirements}
                  </p>
                </div>
              )}

              {selectedJob.benefits && (
                <div className="bg-gradient-to-r from-slate-900/50 to-blue-900/50 p-4 rounded-lg border border-cyan-500/20">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent mb-3">Benefits</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedJob.benefits}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 border-t border-cyan-500/20 flex gap-4">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 px-4 py-3 border-2 border-cyan-500 text-cyan-300 font-bold rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400 transition-all transform hover:scale-105 duration-300 backdrop-blur-sm"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-blue-950 font-bold rounded-lg shadow-lg hover:shadow-cyan-600/60 transition-all transform hover:scale-105 duration-300 backdrop-blur-sm">
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
