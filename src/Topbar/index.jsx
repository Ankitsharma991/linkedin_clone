import React from "react";
import LinkedInLogo from "../assets/linkedinLogo.png";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import user from "../assets/user.png";
import { BsBriefcase } from "react-icons/bs";
import "./index.scss";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
    console.log(route);
  };
  return (
    <div className="topbar-main">
      <img src={LinkedInLogo} className="linkedin-logo" alt="" />
      <div className="react-icons">
        <AiOutlineHome
          size={30}
          className="react-icon"
          onClick={goToRoute("/home")}
        />
        <AiOutlineUserSwitch size={30} className="react-icon" onClick={()=>{goToRoute("/profile")}} />
        <AiOutlineMessage size={30} className="react-icon" />
        <BsBriefcase size={30} className="react-icon" onClick={()=>{goToRoute("/")}} />
        <AiOutlineSearch size={30} className="react-icon" />
        <AiOutlineBell size={30} className="react-icon" />
      </div>
      <img src={user} alt="user" className="user-logo" />
    </div>
  );
}
