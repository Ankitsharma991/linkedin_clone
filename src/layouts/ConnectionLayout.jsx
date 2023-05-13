import React, { useMemo, useState } from "react";
import { getCurrentUser } from "../api/FirestoreAPIs";
import Connections from "../Pages/Connections";
import Topbar from "../components/common/Topbar";

const ConnectionLayout = () => {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar />
      <Connections currentUser={currentUser} />
    </div>
  );
};

export default ConnectionLayout;
