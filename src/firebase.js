import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZxTXLGJjkVZd3BocA5bKLxkZZva87CbQ",
  authDomain: "cca---auditions.firebaseapp.com",
  projectId: "cca---auditions",
  storageBucket: "cca---auditions.firebasestorage.app",
  messagingSenderId: "192731246861",
  appId: "1:192731246861:web:909ec2f5e7101606d9c044",
  measurementId: "G-GB5YM47H4V",
};

const app = initializeApp(firebaseConfig);

// ✅ Firestore initialized ONLY here
export const db = getFirestore(app);

// optional analytics
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
