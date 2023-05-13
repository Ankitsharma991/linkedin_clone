import React from "react";
import "./index.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function SearchUser({ setIsSearch, setSearchInput }) {
  return (
    <div className="search-users">
      <input
        placeholder="Search Users.."
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <AiOutlineCloseCircle
        className="close-icon"
        size={20}
        onClick={() => {
          setIsSearch(false);
          setSearchInput("");
        }}
      />
    </div>
  );
}
