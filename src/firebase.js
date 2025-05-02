import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAGqvSq5e5GwvccqGLHSrGeil9ZBJSP4Y",
  authDomain: "balance-mono-20fef.firebaseapp.com",
  projectId: "balance-mono-20fef",
  storageBucket: "balance-mono-20fef.firebasestorage.app",
  messagingSenderId: "985246264222",
  appId: "1:985246264222:web:16fb549508e38b41f8448f",
  measurementId: "G-8H8JNQ7PE9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
