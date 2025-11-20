import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

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
