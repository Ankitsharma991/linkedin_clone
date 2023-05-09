import React, { useMemo, useState } from "react";
import "./index.scss";
// import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";

import { likePost, getLikesByUser } from "../../../api/FirestoreAPIs";
export default function LikeButton({ userId, postId }) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
  }, [userId, postId]);
  return (
    <div className="like-container">
      <p>{likesCount} people liked this post</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <AiFillHeart size={30} color="#0a66c2" />
          ) : (
            <AiOutlineHeart size={30} />
          )}
          <p className={liked ? "blue" : "black"}>{liked ? "liked" : "like"}</p>
        </div>
        <div className="likes-comment-inner">
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "#0a66c2" : "#212121"}
          />
          <p
            className={showCommentBox ? "blue" : "black"}
            onClick={() => setShowCommentBox(!showCommentBox)}
          >
            Comment
          </p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onClick={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
          />
          <button className="add-comment-btn">Add Comment</button>
        </>
      ) : (
        <></>
      )}{" "}
    </div>
  );
}
