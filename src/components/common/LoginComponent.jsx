import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from "../../api/AuthAPI.jsx";
import linkedinLogo from "../../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import "../../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const LoginComponent = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
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
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) => {
              setCredentials({ ...credentials, email: event.target.value });
            }}
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            className="common-input"
            type="password"
            onChange={(event) => {
              setCredentials({ ...credentials, password: event.target.value });
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
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <div className="link-div">
          <p className="go-to-sign-in">
            New to LinkedIn?{" "}
            <span className="join-now" onClick={() => navigate("/register")}>
              Join now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
