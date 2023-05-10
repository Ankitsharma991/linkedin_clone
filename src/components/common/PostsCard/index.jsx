import React, { useMemo, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getAllUsers } from "../../../api/FirestoreAPIs";
import LikeButton from "../LikeButton";
import Alternate from "./asia2.jpg";

export default function PostsCard({ posts, id }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);
  // console.log("PostCard : ", currentUser);

  return (
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
            {posts.userName}
          </p>
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      <p className="status">{posts.status}</p>
      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />
    </div>
  );
}
