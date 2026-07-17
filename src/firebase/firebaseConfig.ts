import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLedVRi6RXyLVJrWetR_TXhZC_t2m4OsQ",
  authDomain: "sanad-crypto-tracker.firebaseapp.com",
  projectId: "sanad-crypto-tracker",
  storageBucket:
    "sanad-crypto-tracker.firebasestorage.app",
  messagingSenderId: "129125737388",
  appId:
    "1:129125737388:web:4834445f1330fbd9cd1009",
};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

const auth = getAuth(app);

export { app, auth };
