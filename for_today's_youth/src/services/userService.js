import { db } from '../config/firebaseConfig';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Create a comprehensive user profile document in Firestore
 */
export const createUserProfile = async (userId, userData) => {
  try {
    const profileData = {
      uid: userId,
      email: userData.email,
      fullName: userData.fullName || '',
      displayName: userData.displayName || '',
      educationLevel: userData.educationLevel || '',
      skills: userData.skills || [],
      workExperience: userData.workExperience || '',
      languages: userData.languages || [],
      programmingLanguages: userData.programmingLanguages || [],
      extracurricularActivities: userData.extracurricularActivities || [],
      careerInterests: userData.careerInterests || '',
      qualifications: userData.qualifications || {},
      interests: userData.interests || [],
      profileComplete: userData.profileComplete || false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', userId), profileData, { merge: true });
    return { success: true, message: 'Profile created successfully', data: profileData };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user profile from Firestore
 */
export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, message: 'User profile not found' };
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update specific profile field
 */
export const updateProfileField = async (userId, fieldName, fieldValue) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      [fieldName]: fieldValue,
      updatedAt: serverTimestamp(),
    });
    return { success: true, message: `${fieldName} updated successfully` };
  } catch (error) {
    console.error(`Error updating ${fieldName}:`, error);
    return { success: false, error: error.message };
  }
};

/**
 * Save user qualifications
 */
export const saveUserQualifications = async (userId, qualifications) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      qualifications: qualifications,
      updatedAt: serverTimestamp(),
    });
    return { success: true, message: 'Qualifications saved successfully' };
  } catch (error) {
    console.error('Error saving qualifications:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user qualifications
 */
export const getUserQualifications = async (userId) => {
  try {
    const userProfile = await getUserProfile(userId);
    if (userProfile.success) {
      return {
        success: true,
        qualifications: userProfile.data.qualifications || {},
      };
    }
    return { success: false, message: 'User not found' };
  } catch (error) {
    console.error('Error fetching qualifications:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Mark profile as complete
 */
export const markProfileComplete = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      profileComplete: true,
      updatedAt: serverTimestamp(),
    });
    return { success: true, message: 'Profile marked as complete' };
  } catch (error) {
    console.error('Error marking profile complete:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Add a job recommendation to user's profile
 */
export const addJobRecommendation = async (userId, jobData) => {
  try {
    const recommendationsRef = collection(db, 'users', userId, 'recommendations');
    const docRef = doc(recommendationsRef);
    await setDoc(docRef, {
      ...jobData,
      type: 'job',
      savedAt: serverTimestamp(),
    });
    return { success: true, message: 'Job recommendation saved' };
  } catch (error) {
    console.error('Error adding job recommendation:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Add a course recommendation to user's profile
 */
export const addCourseRecommendation = async (userId, courseData) => {
  try {
    const recommendationsRef = collection(db, 'users', userId, 'recommendations');
    const docRef = doc(recommendationsRef);
    await setDoc(docRef, {
      ...courseData,
      type: 'course',
      savedAt: serverTimestamp(),
    });
    return { success: true, message: 'Course recommendation saved' };
  } catch (error) {
    console.error('Error adding course recommendation:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user's recommendations
 */
export const getUserRecommendations = async (userId) => {
  try {
    const recommendationsRef = collection(db, 'users', userId, 'recommendations');
    const q = query(recommendationsRef);
    const snapshot = await getDocs(q);
    const recommendations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: recommendations };
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all users (for admin purposes)
 */
export const getAllUsers = async () => {
  try {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const users = [];
    
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: users };
  } catch (error) {
    console.error('Error fetching all users:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete user profile (soft delete)
 */
export const deleteUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      status: 'deleted',
      deletedAt: serverTimestamp(),
    });
    return { success: true, message: 'Profile deleted successfully' };
  } catch (error) {
    console.error('Error deleting profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Search users by email
 */
export const searchUserByEmail = async (email) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { success: false, message: 'User not found' };
    }
    
    return { success: true, data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
  } catch (error) {
    console.error('Error searching user:', error);
    return { success: false, error: error.message };
  }
};
