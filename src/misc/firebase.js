// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARWuS2stiUwaSmfHL-LhLXCKmB-F2x6I8",
  authDomain: "uschat-67a79.firebaseapp.com",
  projectId: "uschat-67a79",
  storageBucket: "uschat-67a79.appspot.com",
  messagingSenderId: "687729516830",
  appId: "1:687729516830:web:4b1ab2b2cc2d8e509be90f",
  measurementId: "G-6NY7PC799M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);