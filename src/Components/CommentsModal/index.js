import { Modal, Space, Typography, Input, Avatar, Button, Spin } from "antd";
import React, { useState, useEffect } from "react";
import "./styles.css";
// import httpRequest from "../../Api";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import api from "../../Api/api";
import Cookies from "js-cookie";

const PENDING = "PENDING";
const SUCCESS = "SUCCESS";
const FAIL = "FAIL";

const RANDOM_COMMENTS_API =
  "https://644032eab9e6d064be0a8ef1.mockapi.io/coc/comment";

function CommentsModal({ open, onOk, onCancel, modalData }) {
  console.log("Modal open --->", open);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [err, setErr] = useState("");
  // const [modalOpen, setModalOpen] = useState(open);
  const [success, setSuccess] = useState(PENDING);
  const [postingComment, setPostingComment] = useState(false);
  const [timer, setTimer] = useState(-10);
  const [me, setMe] = useState(null);

  const redux = useSelector((state) => state);

  // console.log("redux from cmments modal--->", redux);

  const [skip, setSkip] = useState(0);

  const postComment = async () => {
    // console.log("Comment-->", comment);

    const postID = modalData?.post?._id;

    if (!postID) {
      return;
    }

    try {
      const token = Cookies.get("token");
      setPostingComment(true);
      const resp = await api.post(
        `/add-comment/${postID}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("post resp-->", resp);
      setSuccess(SUCCESS);
      getComments();
    } catch (err) {
      setSuccess(FAIL);
      // console.log(err);
    } finally {
      setPostingComment(false);
      setTimer(3);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      } else {
        setSuccess(PENDING);
        clearInterval(timerId);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [timer]);

  // console.log(timer);

  const getComments = async () => {
    const token = Cookies.get("token");

    const postID = modalData?.post?._id;

    // console.log(postID, modalData);

    if (!postID) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(
        `/comments/post/${postID}?skip=${skip}&limit=${10}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("commet resp--->", response);
      // const response = await axios.get(RANDOM_COMMENTS_API);
      setComments(response.data?.comments || []);
    } catch (err) {
      // console.log(err);
      setErr(
        err?.response?.data ||
          err?.message ||
          "Cannot load comments at the moment!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    const token = Cookies.get("token");
    try {
      const resp = await api.get(`/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(resp);
      setMe(resp.data);
    } catch (err) {
      // console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    getComments();
    getMe();
  }, [modalData, skip]);

  console.log("skip--->", skip);

  return (
    <div>
      <Modal
        open={open}
        onOk={onOk}
        onCancel={() => onCancel()}
        footer={null}
        bodyStyle={{ height: 500, overflowY: "scroll" }}
        destroyOnClose={true}
      >
        <Typography.Title level={5} style={{ margin: 0 }}>
          Comments for {modalData.post?.title}
        </Typography.Title>
        <div className="comment-input-container">
          <Avatar
            src={me?.profilePic || "https://joesch.moe/api/v1/random"}
          ></Avatar>
          <Input
            type="text"
            className="comment-input"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter comment here"
          ></Input>
          {success === PENDING ? (
            <Button
              type="primary"
              onClick={postComment}
              loading={postingComment}
            >
              Comment
            </Button>
          ) : success === SUCCESS ? (
            <Typography.Text style={{ color: "green" }}>
              Commented!
            </Typography.Text>
          ) : (
            <Typography.Text style={{ color: "red" }}>Failed!</Typography.Text>
          )}
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
            {skip <= 0 ? (
              <>
                <Typography.Text>
                  No one commented on this post.
                </Typography.Text>
                <Typography.Text>
                  Be the first commenter!. Comment Now.
                </Typography.Text>
              </>
            ) : (
              <>
                <Typography.Text>No more Comments avaiable!</Typography.Text>
                <Typography.Text
                  style={{ color: "#1E90FF", cursor: "pointer" }}
                  onClick={() =>
                    setSkip((prev) => (prev - 10 >= 0 ? prev - 10 : 0))
                  }
                >
                  Go back...
                </Typography.Text>
              </>
            )}
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
                          <Avatar src={comment?.profilePic}></Avatar>
                          <Typography.Text style={{ fontWeight: "bold" }}>
                            {comment?.username}
                          </Typography.Text>
                        </Space>
                        <Typography.Text style={{ fontSize: 14 }}>
                          {moment(comment?.created_at).format("DD-MM-YYYY")}
                        </Typography.Text>
                      </div>
                      <div>
                        <Typography.Text>{comment?.comment}</Typography.Text>
                      </div>
                    </div>
                  );
                })}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography.Text
                    type="success"
                    style={{ color: "#1E90FF", cursor: "pointer" }}
                    onClick={() => {
                      setSkip((prev) => prev + 10);
                    }}
                  >
                    Load next
                  </Typography.Text>
                  <Typography.Text
                    type="success"
                    style={{ color: "#1E90FF", cursor: "pointer" }}
                    onClick={() => {
                      setSkip((prev) => (prev - 10 >= 0 ? prev - 10 : 0));
                    }}
                  >
                    Go back
                  </Typography.Text>
                </div>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

export default React.memo(CommentsModal);
