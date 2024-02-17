// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//console.log(import.meta.env.VITE_FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "angel-s-blog.firebaseapp.com",
  projectId: "angel-s-blog",
  storageBucket: "angel-s-blog.appspot.com",
  messagingSenderId: "1056019212058",
  appId: "1:1056019212058:web:1b51b30ccda9e8ba4a2ea3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

 