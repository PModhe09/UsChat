import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const config = {
  apiKey: "AIzaSyARWuS2stiUwaSmfHL-LhLXCKmB-F2x6I8",
  authDomain: "uschat-67a79.firebaseapp.com",
  projectId: "uschat-67a79",
  storageBucket: "uschat-67a79.appspot.com",
  messagingSenderId: "687729516830",
  appId: "1:687729516830:web:4b1ab2b2cc2d8e509be90f",
  measurementId: "G-6NY7PC799M",
  databaseURL:"https://uschat-67a79-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = firebase.initializeApp(config);;
export const auth=app.auth();
export const database=app.database();
