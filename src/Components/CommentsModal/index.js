import { Modal, Space, Typography, Input, Avatar, Button, Spin } from "antd";
import React, { useState, useEffect } from "react";
import "./styles.css";
import httpRequest from "../../Api";
import axios from "axios";
import moment from "moment";

const PENDING = "PENDING";
const SUCCESS = "SUCCESS";
const FAIL = "FAIL";

const RANDOM_COMMENTS_API =
  "https://644032eab9e6d064be0a8ef1.mockapi.io/coc/comment";

function CommentsModal({ open, onOk, onCancel, modalData }) {
  console.log("Comments modal data--->", modalData);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [err, setErr] = useState("");
  const [modalOpen, setModalOpen] = useState(open || true);
  const [success, setSuccess] = useState("pending");

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timer > 0) setTimer((prev) => prev - 1);
      else clearInterval(timerId);
    });
    return () => {
      clearInterval(timerId);
    };
  }, [timer]);

  const getComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(RANDOM_COMMENTS_API);
      setComments(response.data.slice(0, 10));
    } catch (err) {
      setErr(
        err?.response?.data ||
          err?.message ||
          "Cannot load comments at the moment!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComments();
  }, [open]);

  console.log(comments);

  return (
    <div>
      <Modal
        open={modalOpen}
        onOk={onOk}
        onCancel={() => setModalOpen(false)}
        footer={null}
        bodyStyle={{ height: 500, overflowY: "scroll" }}
        destroyOnClose={true}
      >
        <Typography.Title level={5} style={{ margin: 0 }}>
          Comments for{" "}
          {modalData.post?.title +
            " which happend to be the most trending news!"}
        </Typography.Title>
        <div className="comment-input-container">
          <Avatar
            src={
              modalData?.postedUserInfo?.profilePic ||
              "https://joesch.moe/api/v1/random"
            }
          ></Avatar>
          <Input
            type="text"
            className="comment-input"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter comment here"
          ></Input>
          <Button type="primary">Comment</Button>
        </div>

        {loading === false && comments.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "centers",
              textAlign: "center",
              padding: 20,
            }}
          >
            <Typography.Text>No one commented on this post.</Typography.Text>
            <Typography.Text>
              Be the first commenter!. Comment below
            </Typography.Text>
          </div>
        ) : (
          <>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: 30,
                }}
              >
                <Spin spinning={loading}></Spin>
              </div>
            ) : (
              <>
                {/* <Typography.Text>Render Comments</Typography.Text> */}
                {comments.map((comment, index) => {
                  return (
                    <div className="each-comment">
                      <div className="comment-header">
                        <Space>
                          <Avatar src={comment?.avatar}></Avatar>
                          <Typography.Text style={{ fontWeight: "bold" }}>
                            {comment?.name}
                          </Typography.Text>
                        </Space>
                        <Typography.Text style={{ fontSize: 14 }}>
                          {moment(comment?.created_at).format("DD-MM-YYYY")}
                        </Typography.Text>
                      </div>
                      <div>
                        <Typography.Text>{comment?.comments}</Typography.Text>
                      </div>
                    </div>
                  );
                })}
                <Typography.Text style={{ color: "#1E90FF" }}>
                  <a href="#comments" onClick={getComments}>
                    Load next 10 comments
                  </a>
                </Typography.Text>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

export default React.memo(CommentsModal);
