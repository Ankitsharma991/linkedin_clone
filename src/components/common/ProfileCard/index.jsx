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

  // console.log(
  //   "currentProfile -> ",
  //   currentProfile,
  //   " and ",
  //   "currentUser-> ",
  //   currentUser
  // )

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
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            <p>
              {Object.values(currentProfile).length === 0
                ? currentUser.location
                : currentProfile?.location}
            </p>
          </div>

          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
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
