/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAbYcXV2MQaMYZCaWmgKjyg689wmChfI14",
  authDomain: "fci-talenttrail.firebaseapp.com",
  projectId: "fci-talenttrail",
  storageBucket: "fci-talenttrail.appspot.com",
  messagingSenderId: "537753234922",
  appId: "1:537753234922:web:8a3b2cf9142378a120d693",
  measurementId: "G-PPHQL159Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);