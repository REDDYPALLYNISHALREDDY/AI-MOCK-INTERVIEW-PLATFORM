import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCMd5CRvqQ2OLIBQL5ZDol8JoPkPx3nqq4",
  authDomain: "intervio-31b8d.firebaseapp.com",
  projectId: "intervio-31b8d",
  storageBucket: "intervio-31b8d.firebasestorage.app",
  messagingSenderId: "155641295384",
  appId: "1:155641295384:web:57a344d20aae3b7e6ec96d",
  measurementId: "G-Q0GJLGP4G0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();