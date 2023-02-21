import React, { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import './navigation.style.scss'
import { ReactComponent as Logo } from "../assets/crown.svg";
import SignIn from "../routes/sign-in/sign-in.component";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="nav-links" to={"/"}>
          <Logo className="logo-container"/>
        </Link>
        <div className="links-container">
          <Link className="nav-links" to={"/shop"}>
            SHOP
          </Link>
          <Link className='sign-in'  to={"/SignIn"}>
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
