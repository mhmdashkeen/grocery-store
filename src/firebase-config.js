// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXNjUaJxkOHMCpFLKCByYdlXMSOjzmfeg",
  authDomain: "grocery-mart-50693.firebaseapp.com",
  projectId: "grocery-mart-50693",
  storageBucket: "grocery-mart-50693.firebasestorage.app",
  messagingSenderId: "60791456815",
  appId: "1:60791456815:web:183f9aeedf606de67e72da",
  measurementId: "G-0N3LHHVJQ3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);