// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfOhRo6He_4KsTsnKeK6FjdEdbvRc49w4",
  authDomain: "linkedin-clone-12256.firebaseapp.com",
  projectId: "linkedin-clone-12256",
  storageBucket: "linkedin-clone-12256.appspot.com",
  messagingSenderId: "461341542970",
  appId: "1:461341542970:web:011810c904699cad920303",
  measurementId: "G-TB1D6PCHJE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);