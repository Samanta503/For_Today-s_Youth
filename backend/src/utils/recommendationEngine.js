/**
 * Main recommendation engine
 * Generates comprehensive recommendations for a user
 */
import { getRecommendedJobs } from './jobMatcher.js';
import { analyzeMissingSkills, prioritizeSkills } from './skillAnalyzer.js';
import { getAllCourses } from './courseRecommender.js';

export const generateUserRecommendations = async (
  userProfile,
  allJobs,
  allSkills,
  allCourses
) => {
  try {
    // 1. Get recommended jobs
    const recommendedJobs = getRecommendedJobs(allJobs, userProfile, 15);

    // 2. Extract target jobs (top matches)
    const topJobs = recommendedJobs
      .filter((m) => m.matchPercentage >= 50)
      .map((m) => m.job);

    // 3. Analyze missing skills
    const missingSkills = analyzeMissingSkills(
      topJobs,
      userProfile.skills || [],
      allSkills
    );

    // 4. Prioritize skills
    const prioritizedSkills = prioritizeSkills(missingSkills, topJobs);

    // 5. Get course recommendations for missing skills
    const courseRecommendations = [];
    for (const skill of prioritizedSkills.slice(0, 5)) {
      const courses = await getAllCourses(skill.skill, allCourses);
      courseRecommendations.push({
        skill: skill.skill,
        courses,
        priority: skill.priority,
      });
    }

    return {
      recommendedJobs,
      targetJobs: topJobs,
      skillGaps: prioritizedSkills,
      courseRecommendations,
      summary: {
        totalJobsMatched: recommendedJobs.length,
        avgMatchPercentage: Math.round(
          recommendedJobs.reduce((acc, j) => acc + j.matchPercentage, 0) /
            recommendedJobs.length
        ),
        skillGapsIdentified: prioritizedSkills.length,
        coursesAvailable: courseRecommendations.reduce(
          (acc, c) => acc + c.courses.total,
          0
        ),
      },
    };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
};
