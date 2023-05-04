import React from "react";
import "./index.scss";

export default function Button({ title, onClick }) {
  return (
    <button onClick={onClick} className="common-btn">
      {title}
    </button>
  );
}
