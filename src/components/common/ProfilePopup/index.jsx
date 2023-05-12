import React, { useMemo, useState } from "react";
import { onLogout } from "../../../api/AuthAPI";
import Button from "../Button";
import "./index.scss";
import { getCurrentUser } from "../../../api/FirestoreAPIs";
import { useNavigate } from "react-router-dom";
export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="popup-card">
      <p className="name">{currentUser.name}</p>
      <p className="headline">{currentUser.headline}</p>
      <Button
        title="View Profile"
        onClick={() => {
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },

          });
        }}
      />
      <Button title="Logout" onClick={onLogout} />
    </div>
  );
}
