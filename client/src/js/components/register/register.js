import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./register.css";

export default function Login(props) {
  const [name, setName] = useState("");
  const [emailAdress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");

  let postRegistaryDetails = async () => {
    let reqObject = { name: name, email: emailAdress, password: password };
    if (password != reEnteredPassword) {
      alert("Passwords shold match");
    } else {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(reqObject),
      }).then(res => {
          console.log(res)
        if (res.ok) {
           props.history.push({pathname:'/login',isNewlyRegistered:true})
          return res.json();
        } else res.json().then(x => alert(x));
      });
      console.log(response, reqObject);
    }
  };

  return (
    <div className="loginContainerTotal">
      <div className="loginContainer">
        <div className="loginWelcomediv">
          <div className="loginWelcomenote">
            <p>Welcome! </p>
            <p>Register to create to your account.</p>
          </div>
        </div>
        <div className="loginInputsContainer">
          <div style={{ margin: "1rem 4rem" }}>
            <input placeholder="Name" className="loginInput" type="text" onChange={e => setName(e.target.value)} />
          </div>
          <div style={{ margin: "1rem 4rem" }}>
            <input
              placeholder="Email address"
              className="loginInput"
              type="text"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div style={{ margin: "1rem 4rem" }}>
            <input
              placeholder="Create password"
              className="loginInput"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div style={{ fontSize: "14px", cursor: "default", margin: " 0 4rem", display: "flex" }}>
            <p>*Password must be atleast 8 characters long</p>
          </div>
          <div style={{ margin: "1rem 4rem" }}>
            <input
              placeholder="Re-enter password"
              className="loginInput"
              type="password"
              onChange={e => setReEnteredPassword(e.target.value)}
            />
          </div>
          <div className="">
            <button className={"button "} type="submit" onClick={postRegistaryDetails}>
              Sign Up
            </button>
          </div>

          <div className="signupForwardLink" style={{ justifyContent: "center" }}>
            <p>sign in instead ?</p>
            <Link onClick={e => {}} to={"/login"}>
              <button className="link"> Sign in </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
