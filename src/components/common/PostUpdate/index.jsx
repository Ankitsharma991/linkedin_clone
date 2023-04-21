import React, { useMemo, useState } from "react";
import { postStatus, getStatus } from "../../../api/FirestoreAPIs";
import "./index.scss";
import ModalComponent from "../Modal";
import PostsCard from "../PostsCard/index.jsx";
import { Button } from "antd";

export default function PostStatus() {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const sendStatus = () => {
    postStatus(status);
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);
  console.log(allStatuses);
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
            <>
              <PostsCard posts={posts} />
            </>
          );
        })}
      </div>
    </div>
  );
}
