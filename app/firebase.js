// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "inventory-management-app-48125.firebaseapp.com",
  projectId: "inventory-management-app-48125",
  storageBucket: "inventory-management-app-48125.appspot.com",
  messagingSenderId: "912629829499",
  appId: "1:912629829499:web:a74181c15297dc9fd037de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);