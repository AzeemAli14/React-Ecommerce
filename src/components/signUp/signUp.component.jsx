import React, { useState, useContext } from "react";
import {
  createEmailAuth,
  createUserDocument,
  signInWithGoogleRedirect,
} from "../utils/firebase/firebase.auth";
import "./signUp.style.scss";
import Button from "../button/button.component";
import FormInput from "../forms/formInput/formInput.form";
import {UserContext} from "../../context/user.context"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const {setCurrentUser} = useContext(UserContext);

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
      setCurrentUser(user);
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

        <div className="buttons-container">
          <Button buttonType="inverted" type="submit">
            Sign up
          </Button>
          <Button
            type="button"
            onClick={signInWithGoogleRedirect}
            buttonType="google"
          >
            Sign up with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
