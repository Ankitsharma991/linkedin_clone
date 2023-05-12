import React, { useMemo, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
} from "../../../api/FirestoreAPIs";
import LikeButton from "../LikeButton";
// import Alternate from "./asia2.jpg";
import { BsPencil, BsTrash } from "react-icons/bs";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const displayUser = () => {
    console.log(allUsers.filter((user) => user.id === posts.userID)[0]);
  };
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);
  // console.log("PostCard : ", currentUser.id);
  // console.log("post", posts.userID);

  // console.log(
  //   "All users",
  //   allUsers.filter((user) => user.id === posts.userID)
  // );
  return (
    <>
      {currentUser && allUsers ? (
        <div className="posts-card" key={id}>
          <div className="post-image-wrapper">
            <img
              className="post-image"
              src={
                allUsers
                  .filter((item) => item.id === posts.userID)
                  .map((item) => item.imageLink)[0]
              }
              alt="profile-picture"
            />
            <div>
              <p
                className="name"
                onClick={() => {
                  navigate("/profile", {
                    state: { id: posts?.id, email: posts.userEmail },
                  });
                }}
              >
                {allUsers
                  .filter((item) => item.id === posts.userID)
                  .map((item) => item.name)[0]}
              </p>
              <p className="timestamp">{posts.timeStamp}</p>
            </div>
            {currentUser.id === posts.userID ? (
              <div className="action-container">
                <BsPencil
                  size={20}
                  className="action-icon"
                  onClick={() => getEditData(posts)}
                />
                <BsTrash
                  size={20}
                  className="action-icon"
                  onClick={() => deletePost(posts.id)}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <p className="status">{posts.status}</p>
          <LikeButton
            userId={currentUser?.id}
            postId={posts.id}
            currentUser={currentUser}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
