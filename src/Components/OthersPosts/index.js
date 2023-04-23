import "./index.css";
import { Link } from "react-router-dom";
import { Card, Avatar, Button } from "antd";

const OthersPosts = (props) => {
  const { projectDetails } = props;
  const { imageUri, title, description, _id, profilePic } = projectDetails;

  return (
    <>
      {/* <li className="project-item-container">
        <img className="project-item-image" src={imageUri} alt={`${_id}`} />

        <div className="project-item-details-container">
          <div className="icons-container">
            <SlLike className="icon button3" />
            <SlDislike className="icon button3" />
            <TfiComments className="icon button3" />
            <CiSaveDown2 className="icon button3" />
          </div>
          <h1 className="project-item-title">
            {title.slice(0, 50)} <span className="slice">...more</span>
          </h1>
          <Link
            to={{ pathname: `/view/${_id}`, state: [projectDetails] }}
            className="others-description"
          >
            <p className="project-item-description">
              {description.slice(0, 150)}
              <span className="slice">...more</span>
            </p>
          </Link>
        </div>
      </li> */}
      <Card
        hoverable={true}
        style={{
          width: 350,
          marginLeft: 15,
          marginBottom: 15,
          // zIndex: 1,
          // position: "relative",
        }}
        cover={
          <>
            {imageUri.endsWith("mp4") || imageUri.endsWith("mkv") ? (
              <video controls style={{ width: 350, height: 200 }}>
                <source src={imageUri} type="video/mp4" />
              </video>
            ) : (
              <img
                alt="Post-item"
                src={imageUri}
                style={{ width: 350, height: 200 }}
              />
            )}
          </>
        }
        actions={[
          // <Link to={{ pathname: `/edit/${_id}`, state: [projectDetails] }}>
          //   <Button type="primary">Edit Post</Button>
          // </Link>,
          // <Button type="ghost" onClick={removeClicked}>
          //   Remove
          // </Button>,
          <Link
            to={{
              pathname: `/Comments/${_id}`,
              state: [{ ...projectDetails, from: "View" }],
            }}
          >
            <Button type="dashed">View More</Button>{" "}
          </Link>,

          // <Link to={`/view/post/${_id}`}>
          //   {
          //     <Button type="primary">
          //       {postStatus === "accepted" ? "Reject" : "Accept"}
          //     </Button>
          //   }
          // </Link>,
          // <Link to={`/view/post/${_id}`}>
          //   <Button>View More</Button>
          // </Link>,
          // <Link to={`/view/post/${_id}`}>
          //   <Button
          //     style={{
          //       backgroundColor:
          //         postStatus === "accepted"
          //           ? "rgba(0,225,0, 0.5)"
          //           : postStatus === "rejected"
          //           ? "rgba(225,0,0,0.5)"
          //           : "orange",
          //     }}
          //   >
          //     {postStatus}
          //   </Button>
          // </Link>,
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar src={profilePic || "https://joesch.moe/api/v1/random"} />
          }
          title={title.substring(0, 50) + "..."}
          description={description.substring(0, 50) + "..."}
        />
      </Card>
    </>
  );
};

export default OthersPosts;
