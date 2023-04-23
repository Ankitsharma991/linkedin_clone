import React from "react";
import ProfileComponent from "../components/common/ProfileComponent";

export default function Profile({ currentUser }) {
//   console.log("Profile: ", currentUser);
  return <ProfileComponent currentUser={currentUser} />;
}
