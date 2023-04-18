import React, { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI.jsx";
import linkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Account Created!!");
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    console.log(response);
  };

  return (
    <div className="login-wrapper">
      <img src={linkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) => {
              setCredentials({ ...credentials, email: event.target.value });
            }}
            type="email"
            className="common-input"
            placeholder="Email or Phone number"
          />
          <input
            className="common-input"
            type="password"
            onChange={(event) => {
              setCredentials({ ...credentials, password: event.target.value });
            }}
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={login} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <p className="go-to-sign-in">
          Already on LinkedIn?{" "}
          <span className="Sign in" onClick={() => navigate("/")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;
