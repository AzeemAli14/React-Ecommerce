import React, { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import "./navigation.style.scss";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../utils/firebase/firebase.auth";

const Navigation = () => {
  const { currentUser,setCurrentUser } = useContext(UserContext);
  
  const SignOutHandler = async() => {
    await signOutUser();
    setCurrentUser(null);
  }
  return (
    <Fragment>
      <div className="navigation">
        <Link className="nav-links" to={"/"}>
          <Logo className="logo-container" />
        </Link>
        <div className="links-container">
          <Link className="nav-links" to={"/shop"}>
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={SignOutHandler}>SIGN OUT</span>
          ) : (
            <Link className="nav-links" to={"/auth"}>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
