import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
/* ---------------- FIREBASE CONFIG ---------------- */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

/* ---------------- AUTH ---------------- */

export const auth = getAuth(app);

/* 🔴 IMPORTANT: keeps user logged in after refresh */
setPersistence(auth, browserLocalPersistence);

/* Google provider */
export const googleProvider = new GoogleAuthProvider();

/* ---------------- DATABASE ---------------- */

export const db = getFirestore(app);

/* ---------------- ANALYTICS ---------------- */

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;


  
