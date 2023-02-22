import React, { useState } from "react";
import {
  createEmailAuth,
  createUserDocument,
} from "../utils/firebase/firebase.auth";
import './signUp.style.scss'
import Button from "../button/button.component";
import FormInput from "../forms/formInput/formInput.form";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const clearStates = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password not matched.");
      return;
    }
    try {
      const { user } = await createEmailAuth(email, password);
      await createUserDocument(user, { displayName });
      clearStates();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      console.log("Submit Error", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account ?</h2>
      <span>Sign up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button buttonType="inverted" type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
