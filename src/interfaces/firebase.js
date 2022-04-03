import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzgRmoyXCDiKazqGA1CrLucgXCi5kFMio",
  authDomain: "shelbayeh-savvy.firebaseapp.com",
  projectId: "shelbayeh-savvy",
  storageBucket: "shelbayeh-savvy.appspot.com",
  messagingSenderId: "1062155553189",
  appId: "1:1062155553189:web:6d90c794cd9844dda5804c",
  measurementId: "G-8KBNS87329",
  databaseURL: "https://shelbayeh-savvy-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const database = getDatabase();

export const auth = getAuth();

export const signOut = () => {
  return auth.signOut();
};
