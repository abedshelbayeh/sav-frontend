import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPojMqMiYFgCVIZzJDg3eXNtQihpnFU-I",
  authDomain: "p-savvy.firebaseapp.com",
  projectId: "p-savvy",
  storageBucket: "p-savvy.appspot.com",
  messagingSenderId: "28904457598",
  appId: "1:28904457598:web:34e3b532d38cf348ae1f2f",
  measurementId: "G-4ZK5VELMLB",
  databaseURL: "https://p-savvy-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const database = getDatabase();

export const auth = getAuth();

export const signOut = () => {
  return auth.signOut();
};
