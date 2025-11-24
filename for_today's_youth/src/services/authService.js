import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Register a new user with email and password
 * Creates auth user and Firestore document with email as document ID
 */
export const registerUser = async (email, password, profileData) => {
  try {
    // Enable persistence for this session
    await setPersistence(auth, browserLocalPersistence);
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with display name
    const fullName = profileData?.fullName || '';
    if (fullName) {
      await updateProfile(user, {
        displayName: fullName,
      });
    }
    
    // Create user profile document in Firestore with EMAIL as document ID
    const userDocData = {
      uid: user.uid,
      email: user.email,
      fullName: profileData?.fullName || '',
      educationLevel: profileData?.educationLevel || '',
      careerInterests: profileData?.careerInterests || '',
      skills: profileData?.skills || [],
      languages: profileData?.languages || [],
      programmingLanguages: profileData?.programmingLanguages || [],
      workExperience: profileData?.workExperience || '',
      extracurricularActivities: profileData?.extracurricularActivities || [],
      qualifications: profileData?.qualifications || {},
      interests: profileData?.interests || [],
      profileComplete: profileData?.profileComplete || false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    await createUserProfileWithEmailId(email, userDocData);
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      },
      message: 'Registration successful!',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: getAuthErrorMessage(error.code),
    };
  }
};

/**
 * Sign in user with email and password
 */
export const loginUser = async (email, password) => {
  try {
    // Enable persistence for this session
    await setPersistence(auth, browserLocalPersistence);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      },
      message: 'Login successful!',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: getAuthErrorMessage(error.code),
    };
  }
};

/**
 * Sign out the current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return {
      success: true,
      message: 'Logout successful!',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to logout',
    };
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent! Check your inbox.',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: getAuthErrorMessage(error.code),
    };
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Listen to authentication state changes
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Create user profile document in Firestore using UID
 */
export const createUserProfile = async (uid, userData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, userData, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Create user profile document in Firestore using EMAIL as document ID
 * This stores the user profile in the 'Users' collection with email as the document name
 */
export const createUserProfileWithEmailId = async (email, userData) => {
  try {
    const userRef = doc(db, 'Users', email);
    await setDoc(userRef, userData, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error creating user profile with email ID:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user profile from Firestore using UID
 */
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, message: 'User profile not found' };
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user profile from Firestore using EMAIL as document ID
 * Retrieves from the 'Users' collection using email as the document name
 */
export const getUserProfileByEmail = async (email) => {
  try {
    const userRef = doc(db, 'Users', email);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, message: 'User profile not found' };
    }
  } catch (error) {
    console.error('Error fetching user profile by email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user profile in Firestore using UID
 */
export const updateUserProfile = async (uid, userData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user profile in Firestore using EMAIL as document ID
 * Updates the 'Users' collection document using email as the document name
 */
export const updateUserProfileByEmail = async (email, userData) => {
  try {
    const userRef = doc(db, 'Users', email);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile by email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Map Firebase error codes to user-friendly messages
 */
const getAuthErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/email-already-in-use': 'Email is already registered. Please login or use a different email.',
    'auth/invalid-email': 'Invalid email address. Please enter a valid email.',
    'auth/weak-password': 'Password should be at least 6 characters long.',
    'auth/user-not-found': 'User not found. Please check your email or create a new account.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/account-exists-with-different-credential': 'Account already exists with different credentials.',
    'auth/operation-not-allowed': 'Operation not allowed. Please contact support.',
    'auth/too-many-requests': 'Too many login attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your internet connection.',
    'auth/invalid-api-key': 'Firebase configuration error. Please contact support.',
    'auth/user-disabled': 'This user account has been disabled.',
  };
  
  return errorMessages[errorCode] || 'An error occurred. Please try again.';
};
