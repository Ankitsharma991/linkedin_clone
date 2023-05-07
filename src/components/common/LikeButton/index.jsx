import React, { useMemo, useState } from "react";
import "./index.scss";
// import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { likePost, getLikesByUser } from "../../../api/FirestoreAPIs";
export default function LikeButton({ userId, postId }) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
  }, [userId, postId]);
  return (
    <div className="like-container" onClick={handleLike}>
      <p>{likesCount} people liked this post</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="likes-inner">
        {liked ? (
          <AiFillHeart size={30} color="#0a66c2" />
        ) : (
          <AiOutlineHeart size={30} />
        )}
        <p className={liked ? "blue" : "black"}>{liked ? "liked" : "like"}</p>
      </div>
    </div>
  );
}
