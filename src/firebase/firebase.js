// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOvdIS-rX3u-hg7wEaIhc_o9SIU0ebzvI",
  authDomain: "todo-application-6c7c2.firebaseapp.com",
  projectId: "todo-application-6c7c2",
  storageBucket: "todo-application-6c7c2.appspot.com",
  messagingSenderId: "877770186736",
  appId: "1:877770186736:web:1a7f7ad8229d4fce964735",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);

// Detect auth state

// onAuthStateChanged(auth, (user) => {
//   if (user != null) {
//     console.log("logged in");
//   } else {
//     console.log("No user!");
//   }
// });
