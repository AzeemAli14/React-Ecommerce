import React, { useEffect } from "react";
import {
  signInWithGooglePopup,
  createUserDocument,
} from "../../utils/firebase/firebase.auth";
import SignInForm from "../../signIn/signIn.component";
import SignUpForm from "../../signUp/signUp.component";

const Authentication = () => {
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
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
