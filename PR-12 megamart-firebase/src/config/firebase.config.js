

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACWRzVL3JuHjtLKiTix2C5xWekdN_ubfU",
  authDomain: "megamart-e8258.firebaseapp.com",
  projectId: "megamart-e8258",
  storageBucket: "megamart-e8258.firebasestorage.app",
  messagingSenderId: "715725983763",
  appId: "1:715725983763:web:52a1421899e03a68b6afe6",
  measurementId: "G-EHNRP84BHM"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);