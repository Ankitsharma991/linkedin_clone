import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import linkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import "../Sass/LoginComponent.scss";
import { async } from "abc";
import { toast } from "react-toastify";

export const LoginComponent = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const [credentials, setCredentials] = useState({});
  const login = async () => {
    // event.preventDefault();
    try {
      // await signInWithEmailAndPassword(auth, email, password);

      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed In to Linkedin!");
    } catch (err) {
      // alert(err.code);
      // toast.error("Something went wrong!");
      toast.error(err.message);
      // setError(error.message);
      // alert(error);
      // alert(Promise.PromiseResult.code);
    }
  };
  return (
    <div className="login-wrapper">
      <img src={linkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            // value={email}
            onChange={(event) => {
              setCredentials({ ...credentials, email: event.target.value });
              // setEmail(event.target.value);
            }}
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            className="common-input"
            type="password"
            // value={password}
            onChange={(event) => {
              setCredentials({ ...credentials, password: event.target.value });
              // setPassword(event.target.value);
            }}
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton
          className="google-btn"
          onClick={() => {
            console.log("Google Button Clicked");
          }}
        />
        <p className="go-to-sign-in">
          New to LinkedIn? <span className="join-now">Join now</span>
        </p>
      </div>
    </div>
  );
};
