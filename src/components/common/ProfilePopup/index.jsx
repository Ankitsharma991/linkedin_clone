import React from "react";
import { onLogout } from "../../../api/AuthAPI";
import "./index.scss";
import { useNavigate } from "react-router-dom";
export default function ProfilePopup() {
  let navigate = useNavigate();
  return (
    <div className="popup-card">
      <ul className="popup-options">
        <li
          className="popup-option"
          onClick={() => {
            navigate("/profile", {
              state: {
                id: "",
              },
            });
          }}
        >
          Profile
        </li>

        <li className="popup-option" onClick={onLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
}
