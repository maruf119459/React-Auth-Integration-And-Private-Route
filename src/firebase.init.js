// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxnSKKTHzwQ9QC2dgthy0JdV1H9dOqfGw",
  authDomain: "private-path-5ce7f.firebaseapp.com",
  projectId: "private-path-5ce7f",
  storageBucket: "private-path-5ce7f.appspot.com",
  messagingSenderId: "676685605136",
  appId: "1:676685605136:web:4d3aa9ef9ac1108d435d95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;