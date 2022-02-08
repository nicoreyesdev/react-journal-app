import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
 
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAI6mBDnczYvrwrVJnGJJMfUfUor9qm30I",
    authDomain: "react-journal-app-6b71f.firebaseapp.com",
    projectId: "react-journal-app-6b71f",
    storageBucket: "react-journal-app-6b71f.appspot.com",
    messagingSenderId: "459074254912",
    appId: "1:459074254912:web:c1a9545d101dcf55b207a5"
};
 
// Initialize Firebase
initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}