import React, { useState, useMemo, useEffect } from "react";
import "./index.scss";
import {
  getStatus,
  getSingleStatus,
  getSingleUser,
} from "../../../api/FirestoreAPIs";
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { uploadImage as uploadImageApI } from "../../../api/imageUpload";
import FileUploadModal from "../FileUploadModal";

export default function ProfileCard({ currentUser, onEdit }) {
  let location = useLocation();
  const [currentProfile, setCurrentProfile] = useState({});
  const [allStatuses, setAllStatus] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

  const uploadImage = () => {
    uploadImageApI(currentImage, currentUser.id, setModalOpen, setProgress, setCurrentImage);
  };

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
      <FileUploadModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getImage={getImage}
        uploadImage={uploadImage}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>

        <div className="profile-info">
          <div>
            <img
              onClick={() => {
                setModalOpen(true);
              }}
              className="profile-image"
              src={currentUser?.imageLink}
            />
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
