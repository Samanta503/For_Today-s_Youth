import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPVjKe7E5FQ9A-mQ_vYn4G3M9LnMDWL28",
  authDomain: "for-today-s-youth.firebaseapp.com",
  projectId: "for-today-s-youth",
  storageBucket: "for-today-s-youth.firebasestorage.app",
  messagingSenderId: "576427712056",
  appId: "1:576427712056:web:d5b157a3b5cd2894fd50cd",
  measurementId: "G-1G6ZV745MZ"
};

// Initialize Firebase Admin SDK
// Make sure to set FIREBASE_ADMIN_SDK_PATH in your .env
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK || '{}');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

export const db = admin.firestore();
export const realtimeDb = admin.database();
export const auth = admin.auth();

export default admin;
