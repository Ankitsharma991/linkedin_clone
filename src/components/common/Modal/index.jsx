import { Button, Modal } from "antd";
import { useState } from "react";
import "./index.scss";
const ModalComponent = ({
  modalOpen,
  setModalOpen,
  setStatus,
  status,
  sendStatus,
}) => {
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            key="submit"
            onClick={sendStatus}
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            Post
          </Button>,
        ]}
      >
        <input
          className="modal-input"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
          }}
          placeholder="What do you want to talk about?"
        />
      </Modal>
    </>
  );
};
export default ModalComponent;
