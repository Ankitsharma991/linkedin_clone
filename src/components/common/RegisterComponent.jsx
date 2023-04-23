import React, { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../../api/AuthAPI.jsx";
import linkedinLogo from "../../assets/linkedinLogo.png";
import { postUserData } from "../../api/FirestoreAPIs.jsx";
import GoogleButton from "react-google-button";
import "../../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      localStorage.setItem("userEmail", res.user.email);
      postUserData({ name: credentials.name, email: credentials.email });
      toast.success("You are registered now!");
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const googleSignIn = () => {
    // let response =
    GoogleSignInAPI();
  };

  return (
    <div className="login-wrapper">
      <img src={linkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) => {
              setCredentials({ ...credentials, name: event.target.value });
            }}
            type="text"
            className="common-input"
            placeholder="Your name"
          />

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
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <div className="link-div">
          <p className="go-to-sign-in">
            Already on LinkedIn?{" "}
            <span className="join-now" onClick={() => navigate("/login")}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
