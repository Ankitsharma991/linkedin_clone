import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

export default function PostsCard({ posts, id }) {
  let navigate = useNavigate();
  // console.log("Users posts : ",posts);

  return (
    <div className="posts-card" key={id}>
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
      <p className="status">{posts.status}</p>
    </div>
  );
}
