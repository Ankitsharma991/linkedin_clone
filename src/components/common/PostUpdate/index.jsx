import React, { useMemo, useState, useEffect } from "react";
import { postStatus, getStatus, updatePost } from "../../../api/FirestoreAPIs";
import "./index.scss";
import { uploadPostImage } from "../../../api/imageUpload";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from "../Modal";
import PostsCard from "../PostsCard/index.jsx";
import { getUniqueID } from "../../../helpers/getUniqueId";
import { Button } from "antd";

export default function PostStatus({ currentUser }) {
  let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {
    if (!currentUser || !currentUser.name) {
      alert("Username is null");
      return;
    }
    // console.log(postImage);

    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: userEmail,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.id,
      postImage: postImage,
    };

    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
    setIsEdit(false);
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    // console.log(status);
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);
// console.log(currentPost)
  return (
    <div className="post-status-main">
      <div className="user-details">
        <img src={currentUser.imageLink} alt="imageLink" />
        <p className="name">{currentUser.name}</p>
        <p className="headline">{currentUser.headline}</p>
      </div>
      <div className="post-status">
        <img
          className="post-image"
          src={currentUser.imageLink}
          alt="imageLink"
        />

        <Button
          className="open-post-modal"
          onClick={() => {
            setIsEdit(false);
            setModalOpen(true);
          }}
        >
          Start a Post
        </Button>
      </div>
      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        setPostImage={setPostImage}
        postImage={postImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
      />

      <div>
        {allStatuses.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} getEditData={getEditData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
