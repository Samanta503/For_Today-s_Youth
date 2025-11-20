import axios from 'axios';

/**
 * Fetch courses from external APIs
 */
export const getExternalCourses = async (skill) => {
  const externalCourses = [];

  try {
    // Fallback: Return curated external course links
    const courseLinks = {
      javascript: [
        {
          title: 'JavaScript Complete Course',
          provider: 'Udemy',
          link: 'https://www.udemy.com/course/the-complete-javascript-course/',
          price: '$14.99',
        },
        {
          title: 'JavaScript Basics',
          provider: 'Google',
          link: 'https://www.coursera.org/learn/javascript',
          price: 'Free',
        },
        {
          title: 'JavaScript Tutorial',
          provider: 'YouTube',
          link: 'https://www.youtube.com/watch?v=PkZYUXjMrF4',
          price: 'Free',
        },
      ],
      react: [
        {
          title: 'React - The Complete Guide',
          provider: 'Udemy',
          link: 'https://www.udemy.com/course/react-the-complete-guide/',
          price: '$14.99',
        },
        {
          title: 'React for Beginners',
          provider: 'Scrimba',
          link: 'https://scrimba.com/learn/learnreact',
          price: 'Free',
        },
      ],
      python: [
        {
          title: 'Python for Everybody',
          provider: 'Coursera',
          link: 'https://www.coursera.org/specializations/python',
          price: 'Free',
        },
        {
          title: 'Complete Python Course',
          provider: 'Udemy',
          link: 'https://www.udemy.com/course/complete-python-bootcamp/',
          price: '$14.99',
        },
      ],
      'machine learning': [
        {
          title: 'Machine Learning Specialization',
          provider: 'Coursera',
          link: 'https://www.coursera.org/specializations/machine-learning-introduction',
          price: 'Free',
        },
        {
          title: 'ML with TensorFlow',
          provider: 'Google',
          link: 'https://www.tensorflow.org/tutorials',
          price: 'Free',
        },
      ],
      'ui/ux design': [
        {
          title: 'UI/UX Design Masterclass',
          provider: 'Udemy',
          link: 'https://www.udemy.com/course/uiux-design-masterclass/',
          price: '$14.99',
        },
        {
          title: 'Design Essentials',
          provider: 'Google',
          link: 'https://www.coursera.org/learn/design',
          price: 'Free',
        },
      ],
    };

    const skillKey = skill.toLowerCase();
    return courseLinks[skillKey] || [];
  } catch (error) {
    console.error('Error fetching external courses:', error);
    return [];
  }
};

/**
 * Get all courses - internal and external
 */
export const getAllCourses = async (skill, internalCourses) => {
  // Get internal courses
  const internal = internalCourses.filter(
    (c) => c.skillTaught.toLowerCase() === skill.toLowerCase()
  );

  // Get external courses
  const external = await getExternalCourses(skill);

  return {
    internal,
    external,
    total: internal.length + external.length,
  };
};
