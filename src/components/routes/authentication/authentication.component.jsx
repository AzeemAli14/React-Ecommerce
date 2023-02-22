import React from "react";
import SignInForm from "../../signIn/signIn.component";
import SignUpForm from "../../signUp/signUp.component";
import './authentication.style.scss'

const Authentication = () => {
  return (
    <div className="auth-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
