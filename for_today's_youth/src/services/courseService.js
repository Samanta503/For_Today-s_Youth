import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

/**
 * Fetch all courses from Firestore
 * Collection: Courses
 * Returns array of courses with their details
 */
export const fetchAllCourses = async () => {
  try {
    const coursesCollection = collection(db, 'Courses');
    const coursesSnapshot = await getDocs(coursesCollection);
    
    const coursesList = coursesSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: coursesList,
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Fetch a single course by name
 * @param {string} courseName - The course name/document ID
 * Returns course details
 */
export const fetchCourseByName = async (courseName) => {
  try {
    const courseDoc = doc(db, 'Courses', courseName);
    const courseSnapshot = await getDoc(courseDoc);
    
    if (courseSnapshot.exists()) {
      return {
        success: true,
        data: {
          id: courseSnapshot.id,
          name: courseSnapshot.id,
          ...courseSnapshot.data(),
        },
      };
    } else {
      return {
        success: false,
        error: 'Course not found',
      };
    }
  } catch (error) {
    console.error('Error fetching course:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Course data structure expected from Firestore
 * 
 * Firestore Collection: Courses
 * Document ID: Course Name
 * 
 * Document Fields:
 * {
 *   courseDetail: {
 *     description: string,
 *     duration: string (e.g., "12 weeks"),
 *     level: string (e.g., "beginner", "intermediate", "advanced"),
 *     prerequisites: string | string[],
 *     whatYouWillLearn: string | string[],
 *     instructor: string,
 *     price: number (optional),
 *     rating: number (optional),
 *     students: number (optional)
 *   }
 * }
 */

/**
 * Example Firestore document structure for a course:
 * 
 * Collection: Courses
 * Document ID: "Web"
 * {
 *   courseDetail: {
 *     description: "Learn web development from scratch...",
 *     duration: "12 weeks",
 *     level: "beginner",
 *     prerequisites: ["HTML basics", "CSS knowledge"],
 *     whatYouWillLearn: ["React", "Node.js", "MongoDB"],
 *     instructor: "John Doe",
 *     price: 4999,
 *     rating: 4.8,
 *     students: 1250
 *   }
 * }
 */
