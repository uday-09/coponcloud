import "./index.css";
import { Link } from "react-router-dom";
import { FiTrendingUp } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";

/* import { SlLike, SlDislike } from "react-icons/sl";
import { TfiComments } from "react-icons/tfi";
import { CiSaveDown2 } from "react-icons/ci"; */
/* import axios from "axios";
import Cookies from "js-cookie"; */

const PostItem = (props) => {
  const { projectDetails, userId, thisIsLiked, index, unLikePost } = props;
  const {
    _id,
    imageUri,
    description,
    title,
    username,
    createdAt,
    postedBy,
    profilePic,
    likes,
    /*   likes, */
  } = projectDetails;

  /* let forLiked;
  if (likes) {
    forLiked = likes.includes(userId) ? "Liked" : "";
  } else {
    forLiked = "";
  }

  const liked = async () => { */
  /*     thisIsLiked(_id, index); */
  /* try {
      const token = Cookies.get("token");
      const likes = await axios.patch(
        `http://localhost:3500/post/like/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(likes.data);
    } catch (err) {
      console.log(err);
    } */
  /*   }; */

  const handleLikeClick = () => {
    if (checkIfLiked()) {
      unLikePost(_id, index);
      return;
    }
    thisIsLiked(_id, index);
  };

  const checkIfLiked = () => {
    return likes.includes(userId);
  };

  console.log(profilePic);
  return (
    <li className="project-item-container2">
      <div className="user-card-container">
        <Link to={{ pathname: `/user/${_id}`, state: [postedBy] }}>
          <img
            src={
              profilePic
                ? profilePic
                : "https://t3.ftcdn.net/jpg/01/03/88/68/240_F_103886826_ZrNWoPPbMO74p06IvKS48zSHK4FqqelF.jpg"
            }
            className="avatar"
            alt="avtar"
          />
        </Link>
        <div className="user-details-container">
          <h1 className="user-name">{username}</h1>
          <p className="user-designation">
            {createdAt.toString().substring(0, 10)}
          </p>
        </div>
      </div>

      <img
        className="project-item-image"
        src={imageUri}
        alt={`project-item ${_id}`}
      />

      <div className="project-item-details-container">
        <div className="icons-container">
          {/*  <p onClick={liked} className={`${forLiked}`}>
            <SlLike className="icon button4" />
            {likes ? likes.length : null}
          </p> */}
          {/* <SlLike className="icon button4" />
          <SlDislike className="icon button4" />
          <TfiComments className="icon button4" />
          <CiSaveDown2 className="icon button4" /> */}
          {/*  <button className="button">Make this Trending</button> */}
          <div className="likes-comments-section">
            <div
              className={`like-wrapper ${checkIfLiked() ? "liked-post" : ""}`}
              onClick={() => handleLikeClick()}
            >
              <p>{likes.length}</p>
              {checkIfLiked() ? (
                <p style={{ marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                  🔥
                </p>
              ) : (
                <FiTrendingUp
                  color="rgb(255, 184, 5)"
                  size={24}
                  style={{ marginRight: 10, marginLeft: 10 }}
                ></FiTrendingUp>
              )}
              <p style={{ marginRight: 10 }}>
                {checkIfLiked() ? "Made trend" : "Trend this"}
              </p>
            </div>
            <Link
              to={{
                pathname: `/Comments/${_id}`,
                state: [{ ...projectDetails, from: "Comments" }],
              }}
            >
              <button
                className="btn-none"
                onClick={() => console.log(projectDetails, userId)}
              >
                <div className="like-wrapper comments">
                  <BiCommentDetail
                    color="rgba(11, 105, 255, 1)"
                    size={24}
                    style={{ marginRight: 10, marginLeft: 10 }}
                  ></BiCommentDetail>
                  <p
                    style={{ marginRight: 10, color: "rgba(11, 105, 255, 1)" }}
                  >
                    Comments
                  </p>
                </div>
              </button>
            </Link>
          </div>
        </div>

        <Link
          to={{
            pathname: `/Comments/${_id}`,
            state: [{ ...projectDetails, from: "View" }],
          }}
          className="post_link_container"
        >
          <h1 className="project-item-title">{title.slice(0, 50)}...</h1>
          <p className="project-item-description">
            {description.slice(0, 100)}
            <span className="moreContent">....click</span>
          </p>
        </Link>
      </div>
    </li>
  );
};

export default PostItem;
