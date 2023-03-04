// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChuJu68kCyGQszrdtrI0Z29nRjf9wBofw",
  authDomain: "do-chat-company-3041521.firebaseapp.com",
  projectId: "do-chat-company-3041521",
  storageBucket: "do-chat-company-3041521.appspot.com",
  messagingSenderId: "949521423081",
  appId: "1:949521423081:web:a5554a06f585d837612e78",
  measurementId: "G-SHP4ZVNF18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// npm install -g firebase-tools
