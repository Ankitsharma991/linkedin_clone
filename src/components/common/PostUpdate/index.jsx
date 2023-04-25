import React, { useMemo, useState } from "react";
import { postStatus, getStatus } from "../../../api/FirestoreAPIs";
import "./index.scss";
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

  const sendStatus = async () => {
    if (!currentUser || !currentUser.name) {
      alert("Username is null");
      return;
    }

    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: userEmail,
      userName: currentUser.name,
      postID: getUniqueID(),
    };

    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);
  // console.log("Available statuses are : ", allStatuses.status);
  return (
    <div className="post-status-main">
      <div className="post-status">
        <Button className="open-post-modal" onClick={() => setModalOpen(true)}>
          Start a Post
        </Button>
      </div>
      <ModalComponent
        status={status}
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        sendStatus={sendStatus}
      />

      <div>
        {allStatuses.map((posts) => {
          return (
            <div key={posts.key}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
