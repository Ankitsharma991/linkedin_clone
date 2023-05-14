import { Button, Modal, Progress } from "antd";
import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import ReactQuill from "react-quill";
import "./index.scss";
const ModalComponent = ({
  setModalOpen,
  sendStatus,
  setStatus,
  modalOpen,
  status,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  setCurrentPost,
  currentPost,
}) => {
  // console.log(currentPost);
  const [progress, setProgress] = useState(0);
  // console.log(progress);
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setProgress(0);
          setCurrentPost({});
        }}
        onCancel={() => {
          setModalOpen(false);
          setStatus("");
          setPostImage("");
          setProgress(0);
          setCurrentPost({});
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
        <div className="posts-body">
          <ReactQuill
            className="modal-input"
            theme="snow"
            placeholder="Share some of your useful thoughts here..."
            value={status}
            onChange={setStatus}
          />
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          {postImage.length > 0 || currentPost?.postImage?.length ? (
            <img
              className="preview-image"
              src={postImage || currentPost?.postImage}
              alt="postImage"
            />
          ) : (
            <></>
          )}{" "}
        </div>
        <label for="pic-upload">
          <AiOutlinePicture size={35} className="picture-icon" />
        </label>
        <input
          id="pic-upload"
          type="file"
          hidden
          onChange={(event) =>
            uploadPostImage(event.target.files[0], setPostImage, setProgress)
          }
        />
      </Modal>
    </>
  );
};
export default ModalComponent;
