import React, { useState } from "react";
import {
  createUserDocument,
  signInEmailAuth,
  signInWithGooglePopup,
} from "../utils/firebase/firebase.auth";
import "./signIn.style.scss";
import Button from "../button/button.component";
import FormInput from "../forms/formInput/formInput.form";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const clearStates = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDoc = await createUserDocument(user);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (password !== confirmPassword) {
    //   alert("Password not matched.");
    //   return;
    // }
    try {
      // const { user } = await createEmailAuth(email, password);
      // await createUserDocument(user, { displayName });
      const response = await signInEmailAuth(email, password);

      clearStates();
    } catch (error) {
      // if (error.code === "auth/email-already-in-use") {
      //   alert("Cannot create user, email already in use");
      // }
      // console.log("Submit Error", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account ?</h2>
      <span>Sign in with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        {/* <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        /> */}
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        {/* <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        /> */}

        <div className="buttons-container">
          <Button type="submit">Login</Button>
          <Button onClick={signInWithGoogle} buttonType="google" >
            Login in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
