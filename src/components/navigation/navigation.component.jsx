import React, { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import "./navigation.style.scss";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Navigation = () => {
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
          <Link className="sign-in" to={"/auth"}>
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
