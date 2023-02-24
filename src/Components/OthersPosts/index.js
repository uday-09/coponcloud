import "./index.css";
import { Link } from "react-router-dom";
import { SlLike, SlDislike } from "react-icons/sl";
import { TfiComments } from "react-icons/tfi";
import { CiSaveDown2 } from "react-icons/ci";

const OthersPosts = (props) => {
  const { projectDetails } = props;
  const { imageUri, title, description, _id } = projectDetails;

  return (
    <>
      <li className="project-item-container">
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
      </li>
    </>
  );
};

export default OthersPosts;
