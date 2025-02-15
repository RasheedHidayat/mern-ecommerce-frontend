// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-YXnaXrt8pop9mzF7sNK12Ud0bSw8KyU",
  authDomain: "mern-ecommerce-2024-cc62e.firebaseapp.com",
  projectId: "mern-ecommerce-2024-cc62e",
  storageBucket: "mern-ecommerce-2024-cc62e.firebasestorage.app",
  messagingSenderId: "846377000401",
  appId: "1:846377000401:web:876d04ddf765366435d4f0",
  measurementId: "G-KWGNRRCCE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);
