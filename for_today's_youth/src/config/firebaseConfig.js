import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Firebase Configuration
// Project: For Today's Youth
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDPVjKe7E5FQ9A-mQ_vYn4G3M9LnMDWL28',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'for-today-s-youth.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'for-today-s-youth',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'for-today-s-youth.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '576427712056',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:576427712056:web:d5b157a3b5cd2894fd50cd',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-1G6ZV745MZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Set persistence to LOCAL so users stay logged in after page refresh
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Auth persistence error:', error);
  });

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Realtime Database
export const realtimeDb = getDatabase(app);

export default app;
