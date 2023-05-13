import React, { useEffect, useState } from "react";
import LinkedInLogo from "../../../assets/linkedinLogo.png";
import SearchUser from "../SearchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import user from "../../../assets/user.png";
import { BsBriefcase } from "react-icons/bs";
import "./index.scss";
import { getAllUsers } from "../../../api/FirestoreAPIs";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../ProfilePopup";

export default function Topbar() {
  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
    // console.log(route)
  };

  const [isShow, setIsShow] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const popup = () => {
    setIsShow(!isShow);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: { id: user.id, email: user.email },
    });
  };
  // console.log(users[0]);

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 100);
    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className="topbar-main">
      <img src={LinkedInLogo} className="linkedin-logo" alt="" />

      {isSearch ? (
        <SearchUser setSearchInput={setSearchInput} setIsSearch={setIsSearch} />
      ) : (
        <div className="react-icons">
          <AiOutlineSearch
            onClick={() => setIsSearch(true)}
            size={30}
            className="react-icon"
          />
          <AiOutlineHome
            size={30}
            className="react-icon"
            onClick={() => {
              goToRoute("/home");
            }}
          />
          <AiOutlineUserSwitch
            size={30}
            className="react-icon"
            onClick={() => {
              goToRoute("/connections");
            }}
          />
          <AiOutlineMessage size={30} className="react-icon" />
          <BsBriefcase
            size={30}
            className="react-icon"
            onClick={() => {
              goToRoute("/");
            }}
          />

          <AiOutlineBell size={30} className="react-icon" />
        </div>
      )}
      <img
        src={user}
        onClick={() => {
          popup();
        }}
        alt="user"
        className="user-logo"
      />
      <div>
        {isShow ? (
          <div className="popup-position">
            <ProfilePopup />
          </div>
        ) : (
          ""
        )}
      </div>
      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Users Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div
                className="search-inner"
                onClick={() => {
                  openUser(user);
                }}
              >
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
