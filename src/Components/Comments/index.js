import React from "react";
import httpRequest from "../../Api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import "./styles.css";
import { Card, Avatar, Button, Spin } from "antd";
import ErrorPage from "../ErrorPage";
import CommentsModal from "../CommentsModal";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import api from "../../Api/api";
import Cookies from "js-cookie";
import callLikeApi from "../../Api/likeApi";
import callUnlikeApi from "../../Api/unLikeApi";

function Comments(props) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postedUserInfo, setPostedUserInfo] = useState(null);
  const [likes, setLikes] = useState([]);
  const [err, setErr] = useState("");
  const { id } = useParams();

  const value = useParams();
  console.log(value);

  const [me, setMe] = useState(null);

  const state = props?.location;
  // console.log(state);

  const { from } = props?.location?.state[0];
  // console.log("Props--->", from, from === "View", postedBy);

  const [modal, setModal] = useState(from === "View" ? false : true);

  const getPostInfo = () => {
    console.log("Comes here to fetch post");
    if (!id) {
      window.location.reload(false);
      return setErr("Something went wrong!");
    }

    setLoading(true);
    httpRequest
      .get(`/coc/get/post/${id}`)
      .then((response) => {
        console.log(response);
        setPost(response.data);
        console.log(response?.data?.likes);
        setLikes(response?.data?.likes || []);
        httpRequest
          .get(`/user/${response.data?.postedBy}`)
          .then((res) => {
            setPostedUserInfo(res.data?.user);
          })
          .catch((err) => {
            // console.log(err);
          })
          .finally(() => {
            // console.log("Done");
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
    getPostInfo();
    getMe();
  }, [id]);

  const likeCheck = () => {
    return likes.includes(me?._id);
  };

  console.log("Post ==>", post);
  if (err) {
    return (
      <>
        <ErrorPage errorMessage={err}></ErrorPage>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <ErrorPage
          showImage={false}
          errorMessage="Wait! we are fetching post..."
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin spinning={loading}></Spin>
          </div>
        </ErrorPage>
      </>
    );
  }

  const handleLike = async () => {
    if (likeCheck()) {
      callUnlikeApi(post?._id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      callLikeApi(post?._id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    setLikes((prev) => {
      let arr = [];
      if (likeCheck()) {
        const index = prev.indexOf(me?._id);
        prev.splice(index, 1);
        return [...prev];
      } else {
        return [...prev, me?._id];
      }
    });
  };

  console.log("Likes--->", likes);

  return (
    <>
      <Header></Header>
      <CommentsModal
        open={modal}
        modalData={{ post, postedUserInfo }}
        onCancel={() => setModal(false)}
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
              {/* <Link to={{ pathname: `/user/${postedBy}`, state: [postedBy] }}> */}
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
              {/* </Link> */}
            </>
          }
          actions={[
            <Button
              icon={likeCheck() ? <LikeFilled></LikeFilled> : <LikeOutlined />}
              type={likeCheck() ? "primary" : "default"}
              onClick={() => handleLike()}
            >
              {likeCheck() ? `You trended this` : `Make this post trend`}
            </Button>,
            // <Button onClick={() => setModal(true)}>Show Comments</Button>,
            <Button onClick={() => setModal(true)}>Comment</Button>,
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
