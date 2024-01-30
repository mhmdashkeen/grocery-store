// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsx2Hgxid1owK8fHk985KUz42Zg9GbZg8",
  authDomain: "react-ecommerce-91985.firebaseapp.com",
  projectId: "react-ecommerce-91985",
  storageBucket: "react-ecommerce-91985.appspot.com",
  messagingSenderId: "875754212886",
  appId: "1:875754212886:web:17c976e404aacd257d6f37",
  measurementId: "G-L34L5QM572"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);