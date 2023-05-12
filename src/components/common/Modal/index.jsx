import { Button, Modal } from "antd";
import { useState } from "react";
import "./index.scss";
const ModalComponent = ({
  setModalOpen,
  sendStatus,
  setStatus,
  modalOpen,
  status,
  isEdit,
  updateStatus,
}) => {
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
          setStatus("");
        }}
        footer={[
          <Button
            key="submit"
            onClick={isEdit ? updateStatus : sendStatus}
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            {isEdit ? "Update" : " Post"}
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
