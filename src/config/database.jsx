// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2dVf3BbCni-6bLMnCeR9Ezd6ZDltxFqc",
  authDomain: "my-web-6e66e.firebaseapp.com",
  projectId: "my-web-6e66e",
  storageBucket: "my-web-6e66e.appspot.com",
  messagingSenderId: "1022679703999",
  appId: "1:1022679703999:web:9809a533bdf1672ef9c10a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)