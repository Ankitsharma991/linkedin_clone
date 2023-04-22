import React, { useMemo, useState } from "react";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar/index";

import ProfilePage from "../components/common/ProfilePopup/index";

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <ProfilePage currentUser={currentUser} />
    </div>
  );
}
