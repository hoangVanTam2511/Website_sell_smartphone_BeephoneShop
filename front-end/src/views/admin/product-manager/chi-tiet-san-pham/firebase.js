// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCkN2OTfrdj1-tcSpTuUer5mY8R09m2u9s",
  authDomain: "uploadimage-575f0.firebaseapp.com",
  projectId: "uploadimage-575f0",
  storageBucket: "uploadimage-575f0.appspot.com",
  messagingSenderId: "851084753540",
  appId: "1:851084753540:web:bf2074784647b58f9120d1",
  measurementId: "G-1YVEXEWCVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)