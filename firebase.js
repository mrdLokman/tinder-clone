// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxngPxfnSANn4pb1Kzcgh4ipgPyiGcTpg",
  authDomain: "tinder-clone-8d604.firebaseapp.com",
  projectId: "tinder-clone-8d604",
  storageBucket: "tinder-clone-8d604.appspot.com",
  messagingSenderId: "40078795061",
  appId: "1:40078795061:web:8d65181b5be4c5ceebac7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db};