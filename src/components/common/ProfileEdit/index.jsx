import React, { useState } from "react";
import "./index.scss";

export default function ProfileEdit({ onEdit }) {
  const [editInputs, setEditInputs] = useState({});
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
};
console.log(editInputs);
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <button onClick={onEdit}>Go back</button>
      </div>
      <div className="profile-edit-inputs">
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          name="headline"
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Location"
          name="location"
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          name="company"
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          name="college"
        />
      </div>
    </div>
  );
}
