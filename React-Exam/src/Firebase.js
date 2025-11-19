
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCh1luMVDQodsVNdFbRyo2bSVL1zX11Ysk",
  authDomain: "hotel-management-dc62c.firebaseapp.com",
  projectId: "hotel-management-dc62c",
  storageBucket: "hotel-management-dc62c.firebasestorage.app",
  messagingSenderId: "993616247714",
  appId: "1:993616247714:web:46654f062333ec0b21d0fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);