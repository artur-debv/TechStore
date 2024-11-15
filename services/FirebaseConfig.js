import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6EzGUXvCnyBQ0hO2MPN3hKvQiM9AGJXk",
  authDomain: "techstore-622ec.firebaseapp.com",
  projectId: "techstore-622ec",
  storageBucket: "techstore-622ec.firebasestorage.app",
  messagingSenderId: "629341822816",
  appId: "1:629341822816:web:63e2680e5842dccce44805",
  measurementId: "G-SCTHPGN4DM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);