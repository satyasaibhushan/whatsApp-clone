import React, { useState } from "react";
import { Link } from "react-router-dom";

import CheckBox from "../checkbox/checkbox";
import "./login.css";

export default function Login(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  console.log(keepSignedIn);

  return (
    <div className="loginContainerTotal">
      <div className="loginContainer">
        <div className="loginWelcomediv">
          <div className="loginWelcomenote">
            <p>Welcome! </p>
            <p>Sign in to continue to your account.</p>
          </div>
        </div>
        <div className="loginInputsContainer">
          <div style={{ margin: "1rem 4rem" }}>
            <input placeholder="user name / Email id" className="loginInput" type="text" />
          </div>
          <div style={{ margin: "1rem 4rem" }}>
            <input placeholder="password" className="loginInput" type="text" />
          </div>
          <div className="keepMeSignedInContainer">
            <div className="keepMeSignedInBox">
              <CheckBox
                isChecked={keepSignedIn}
                checkedBox={() => {
                  setKeepSignedIn(!keepSignedIn);
                }}
              />
            </div>
            <div
              onClick={() => {
                setKeepSignedIn(!keepSignedIn);
              }}>
              <p>keep me signed in untill I signout.</p>
            </div>
          </div>
          <div className="">
            <button className={"button "} type="submit">
              Sign In
            </button>
          </div>
          <div className="signupForwardLink" style={{ justifyContent: "center" }}>
            <p>not a member yet ?</p>
            <Link onClick={e => {}} to={"/register"}>
              <button className="link"> Sign up </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
