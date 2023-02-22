// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMXRgl4Jk3Imw8uHexeZt1neqb44Yvvus",
  authDomain: "react-commerce-64c9c.firebaseapp.com",
  projectId: "react-commerce-64c9c",
  storageBucket: "react-commerce-64c9c.appspot.com",
  messagingSenderId: "493518780793",
  appId: "1:493518780793:web:7b10dddf06208d412d97a8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const authProvider = new GoogleAuthProvider();

authProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, authProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, authProvider);
export const db = getFirestore();

export const createUserDocument = async (
  userAuth,
  additionalInfo = { displayName: "Azeem Ali" }
) => {
  if (!userAuth) {
    return;
  }
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log("userDocRef", userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log("userSnapshot", userSnapshot);

  //Check wheter the user exists or not
  console.log("userSnapshot Exists", userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createEmailAuth = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInEmailAuth = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};
