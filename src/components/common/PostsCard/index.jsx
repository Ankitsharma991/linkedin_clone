import React, { useMemo, useState, useEffect } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getConnections,
} from "../../../api/FirestoreAPIs";
import LikeButton from "../LikeButton";
import { BsPencil, BsTrash } from "react-icons/bs";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // const displayUser = () => {
  //   console.log(allUsers.filter((user) => user.id === posts.userID)[0]);
  // };

  useEffect(() => {
    getConnections(currentUser.id, posts.userID, setIsConnected);
  }, [currentUser.id, posts.userID]);

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
  // console.log(posts);

  return isConnected ? (
    <>
      {/* {currentUser && allUsers ? ( */}
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
                  state: { id: posts.userID, email: posts.userEmail },
                });
              }}
            >
              {
                allUsers
                  .filter((item) => item.id === posts.userID)
                  .map((item) => item.name)[0]
              }
            </p>
            <p className="timestamp">
              {
                allUsers
                  .filter((item) => item.id === posts.userID)
                  .map((item) => item.headline)[0]
              }
            </p>
            <p className="timestamp">{posts.timestamp}</p>
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
      {/* ) : (
         ""
      )} */}
    </>
  ) : (
    <></>
  );
}
