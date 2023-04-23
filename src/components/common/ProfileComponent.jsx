import React from "react";
import ProfileCard from "./ProfileCard";
import Topbar from "./Topbar";
export default function ProfileComponent({ currentUser }) {
  return (
    <div>
      <Topbar />
      <ProfileCard currentUser={currentUser} />
    </div>
  );
}
