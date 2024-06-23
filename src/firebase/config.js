import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDoeXqU2h81bx7J0SZ1V_8i4M3DkBcrtsg",
  authDomain: "shopcart-d0c66.firebaseapp.com",
  projectId: "shopcart-d0c66",
  storageBucket: "shopcart-d0c66.appspot.com",
  messagingSenderId: "183086977144",
  appId: "1:183086977144:web:935256d36ae7c30907dd8d",
  measurementId: "G-WLXYPCD9QP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
