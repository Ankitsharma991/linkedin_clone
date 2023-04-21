import React, { useState } from "react";
import { postStatus } from "../../../api/FirestoreAPIs";
import "./index.scss";
import ModalComponent from "../Modal";

import { Button } from "antd";

export default function PostStatus() {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const sendStatus = () => {
    postStatus(status);
  };
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
    </div>
  );
}
