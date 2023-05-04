import React, { useState, useMemo } from "react";
import "./index.scss";
import {
  getStatus,
  getSingleStatus,
  getSingleUser,
} from "../../../api/FirestoreAPIs";
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
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
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
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
            <p className="location">
              {Object.values(currentProfile).length === 0
                ? `${currentUser.city}, ${currentUser.country}`
                : currentProfile?.city}
            </p>
            <a
              className="website"
              href={
                Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website
              }
              target="_blank"
            >
              {Object.values(currentProfile).length === 0
                ? `${currentUser.website}`
                : currentProfile?.website}
            </a>
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
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? `${currentUser.aboutMe}`
            : currentProfile?.aboutMe}
        </p>
        <p className="skills">
          <span className="skill-label">Skills:</span>&nbsp;
          {Object.values(currentProfile).length === 0
            ? `${currentUser.skills}`
            : currentProfile?.skills}
        </p>
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
