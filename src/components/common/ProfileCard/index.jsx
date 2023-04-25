import React, { useState, useMemo } from "react";
import "./index.scss";
import {
  getStatus,
  getSingleStatus,
  getSingleUser,
} from "../../../api/FirestoreAPIs";
import PostsCard from "../PostsCard";
import { useLocation } from "react-router-dom";

export default function ProfileCard({ currentUser, onEdit }) {
  let location = useLocation();
  const [currentProfile, setCurrentProfile] = useState({});
  const [allStatuses, setAllStatus] = useState([]);

  useMemo(() => {
    getStatus(setAllStatus);
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <div className="profile-card">
        <div className="edit-btn">
          <button onClick={onEdit}>Edit</button>
        </div>

        <div className="profile-info">
          <div>
            <h3 className="userName">
              {currentUser.name ? currentUser.name : ""}
            </h3>
            <p className="heading">{currentUser.headline}</p>
            <p>{currentUser.location ? currentUser.location : ""}</p>
          </div>

          <div className="right-info">
            <p className="college">
              {currentUser.college ? currentUser.college : ""}
            </p>
            <p className="company">
              {currentUser.company ? currentUser.company : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="post-status-main">
        {allStatuses
          .filter((item) => {
            return item.userEmail === localStorage.getItem("userEmail");
          })
          .map((posts) => {
            return (
              <div key={posts.key}>
                <PostsCard posts={posts} />
              </div>
            );
          })}
      </div>
    </>
  );
}
