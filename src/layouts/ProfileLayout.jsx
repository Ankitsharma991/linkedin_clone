import React, { useMemo, useState } from "react";
import Topbar from "../components/common/Topbar/index";
import { getCurrentUser } from "../api/FirestoreAPIs";
import Profile from "../Pages/Profile";

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});
  // console.log("ProfileLayout: ",currentUser)
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Profile currentUser={currentUser} />
    </div>
  );
}
