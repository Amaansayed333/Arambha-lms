// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7U1u9Z_8UT4jUmRqZKlfxeEVtmrnxC9g",
  authDomain: "arambha-lms.firebaseapp.com",
  projectId: "arambha-lms",
  storageBucket: "arambha-lms.firebasestorage.app",
  messagingSenderId: "684728741935",
  appId: "1:684728741935:web:0fce676462fabd4812d6da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);