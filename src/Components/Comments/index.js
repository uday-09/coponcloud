import React from "react";
import httpRequest from "../../Api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import "./styles.css";
import { Card, Avatar, Button, Modal, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import CommentsModal from "../CommentsModal";

function Comments(props) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postedUserInfo, setPostedUserInfo] = useState(null);
  const [err, setErr] = useState("");
  const { id } = useParams();
  const getPostInfo = () => {
    if (!id) {
      return setErr("Something went wrong!");
    }
    setLoading(true);
    httpRequest
      .get(`/coc/get/post/${id}`)
      .then((response) => {
        setPost(response.data);
        httpRequest
          .get(`/user/${response.data?.postedBy}`)
          .then((res) => {
            setPostedUserInfo(res.data?.user);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            console.log("Done");
          });
      })
      .catch((err) => {
        setErr(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPostInfo();
  }, [id]);

  console.log("Post ==>", post);

  return (
    <>
      <Header></Header>
      <CommentsModal
        open={true}
        modalData={{ post, postedUserInfo }}
      ></CommentsModal>
      <div className="centered-view">
        <Card
          hoverable={true}
          loading={loading}
          style={{
            width: 600,
          }}
          cover={
            <>
              {post?.imageUri.endsWith("mp4") ||
              post?.imageUri.endsWith("mkv") ? (
                <video controls style={{ width: "100%", height: 300 }}>
                  <source src={post?.imageUri} type="video/mp4" />
                </video>
              ) : (
                <img
                  alt="Post-post"
                  src={post?.imageUri}
                  style={{ width: "100%", height: 300 }}
                />
              )}
            </>
          }
          actions={[
            <Link to={`/view/post/${post?._id}`}>
              {
                <Button type="primary">
                  {post?.postStatus === "accepted" ? "Reject" : "Accept"}
                </Button>
              }
            </Link>,
            <Link to={`/view/post/${post?._id}`}>
              <Button>View More</Button>
            </Link>,
            <Link to={`/view/post/${post?._id}`}>
              <Button
                style={{
                  backgroundColor:
                    post?.postStatus === "accepted"
                      ? "rgba(0,225,0, 0.5)"
                      : post?.postStatus === "rejected"
                      ? "rgba(225,0,0,0.5)"
                      : "orange",
                }}
              >
                {post?.postStatus}
              </Button>
            </Link>,
          ]}
        >
          <Card.Meta
            avatar={
              <Avatar
                src={
                  postedUserInfo?.profilePic ||
                  "https://joesch.moe/api/v1/random"
                }
              />
            }
            title={post?.title}
            description={post?.description}
          />
        </Card>
      </div>
    </>
  );
}

export default Comments;
