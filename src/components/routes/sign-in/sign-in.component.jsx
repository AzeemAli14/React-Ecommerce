import React, { useEffect } from "react";
import {
  signInWithGooglePopup,
  createUserDocument,
} from "../../utils/firebase/firebase.auth";
import SignUpForm from "../../forms/signUp/signUp.form";

const SignIn = () => {
  // useEffect(() => {
  //     const response = getRedirectResult(auth);
  //     // console.log("Response in useEffect", response)
  // }, [])

  const onPopup = async () => {
    const { user } = await signInWithGooglePopup();
    console.log("response", user);
    const userDocRef = await createUserDocument(user);
  };

  //   const onRedirect = async () => {
  //     const { user } = await signInWithGooglePopup();
  //     console.log("response", user);
  //     const userDocRef = await createUserDocument(user);
  //   };
  return (
    <div>
      <button onClick={onPopup}>Sign In with Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
