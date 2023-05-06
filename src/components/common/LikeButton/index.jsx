import React, { useMemo } from "react";
import "./index.scss";
import { AiOutlineLike } from "react-icons/ai";
import { likePost, getLikesByUser } from "../../../api/FirestoreAPIs";
export default function LikeButton({ userId, postId }) {
  const handleLike = () => {
    likePost(userId, postId);
  };
  useMemo(() => {
    getLikesByUser(userId, postId);
  }, []);
  return (
    <div className="like-container" onClick={handleLike}>
      <AiOutlineLike size={30} />
      <p>Like</p>
    </div>
  );
}
