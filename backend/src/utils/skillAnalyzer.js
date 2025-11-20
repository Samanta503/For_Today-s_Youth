/**
 * Skill Analysis and Suggestion
 * Recommends skills based on target jobs and user profile
 */
export const analyzeMissingSkills = (targetJobs, userSkills, allSkills) => {
  const missingSkillsSet = new Set();
  const skillDetails = {};

  targetJobs.forEach((job) => {
    job.requiredSkills.forEach((skillName) => {
      if (!userSkills.includes(skillName)) {
        missingSkillsSet.add(skillName);

        // Get skill details from database
        const skillDetail = allSkills.find(
          (s) => s.name.toLowerCase() === skillName.toLowerCase()
        );
        if (skillDetail) {
          skillDetails[skillName] = skillDetail;
        }
      }
    });
  });

  return Array.from(missingSkillsSet)
    .map((skillName) => ({
      skill: skillName,
      ...skillDetails[skillName],
    }))
    .sort((a, b) => (a.learningTime || 0) - (b.learningTime || 0));
};

/**
 * Priority scoring for skills
 */
export const prioritizeSkills = (suggestedSkills, jobs) => {
  return suggestedSkills.map((skill) => {
    const relevantJobs = jobs.filter((job) =>
      job.requiredSkills.some((s) => s.toLowerCase() === skill.skill.toLowerCase())
    );

    return {
      ...skill,
      priority: relevantJobs.length > 0 ? 'High' : 'Medium',
      opportunitiesUnlocked: relevantJobs.length,
      jobs: relevantJobs,
    };
  });
};
