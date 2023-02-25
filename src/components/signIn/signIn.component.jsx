import React, { useContext, useState } from "react";
import {
  createUserDocument,
  signInEmailAuth,
  signInWithGooglePopup,
} from "../utils/firebase/firebase.auth";
import "./signIn.style.scss";
import Button from "../button/button.component";
import FormInput from "../forms/formInput/formInput.form";
import { UserContext } from "../../context/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const {setCurrentUser} = useContext(UserContext);

  const clearStates = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocument(user);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {user} = await signInEmailAuth(email, password);
      setCurrentUser(user);
      clearStates();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Invalid Password");
          break;
        case "auth/wrong-password":
          alert("Invalid Email");
          break;
        case "auth/popup-closed-by-user":
          alert("Login popup cancelled by user");
          break;
        case "auth/cancelled-popup-request":
          alert("Cancelled popup request");
          break;
        default:
          console.log("Handle submit Error", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account ?</h2>
      <span>Sign in with your Email and Password</span>
      <form onSubmit={handleSubmit}>
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

        <div className="buttons-container">
          <Button buttonType="inverted" type="submit">Sign in</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
          Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
