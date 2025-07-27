// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config (keep this unchanged)
const firebaseConfig = {
Put your keys here
};

// 🔧 Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export the Firestore DB instance
const db = getFirestore(app);
export { db };
