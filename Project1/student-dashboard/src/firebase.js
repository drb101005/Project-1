// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

Your api keys here ...

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ FIX: Export the Firestore instance properly
const db = getFirestore(app);
export { db };
