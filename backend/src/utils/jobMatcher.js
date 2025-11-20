/**
 * Job Matching Algorithm
 * Scores jobs based on user's education, skills, and experience
 */
export const calculateJobMatch = (job, userProfile) => {
  let score = 0;
  let matchedCriteria = [];

  // Check education level
  const educationLevels = ['10th', '12th', 'diploma', 'bachelor', 'master', 'phd'];
  const userEdIndex = educationLevels.indexOf(userProfile.educationLevel);
  const jobEdIndex = educationLevels.indexOf(job.requiredEducation);

  if (userEdIndex >= jobEdIndex) {
    score += 30;
    matchedCriteria.push('Education Level');
  }

  // Check skills
  const userSkills = (userProfile.skills || []).map((s) => s.toLowerCase());
  const requiredSkills = (job.requiredSkills || []).map((s) => s.toLowerCase());
  const matchedSkills = requiredSkills.filter((s) => userSkills.includes(s));
  const skillMatch = (matchedSkills.length / requiredSkills.length) * 100;

  if (matchedSkills.length > 0) {
    score += 40 * (matchedSkills.length / requiredSkills.length);
    matchedCriteria.push(`Skills (${matchedSkills.length}/${requiredSkills.length})`);
  }

  // Check experience
  const userExperience = userProfile.yearsOfExperience || 0;
  if (userExperience >= job.minExperience) {
    score += 30;
    matchedCriteria.push('Experience');
  }

  return {
    jobId: job.id,
    score: Math.round(score),
    matchPercentage: Math.round((score / 100) * 100),
    matchedCriteria,
    missingSkills: requiredSkills.filter((s) => !userSkills.includes(s)),
  };
};

/**
 * Find jobs with highest match scores
 */
export const getRecommendedJobs = (jobs, userProfile, limit = 10) => {
  const matches = jobs.map((job) => calculateJobMatch(job, userProfile));
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((match) => ({
      ...match,
      job: jobs.find((j) => j.id === match.jobId),
    }));
};
