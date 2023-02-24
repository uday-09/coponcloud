import "./index.css";
import { Link } from "react-router-dom";
/* import { SlLike, SlDislike } from "react-icons/sl";
import { TfiComments } from "react-icons/tfi";
import { CiSaveDown2 } from "react-icons/ci"; */

const MyPostItem = (props) => {
  const { projectDetails, remove } = props;
  const { _id, imageUri, description, title } = projectDetails;

  const removeClicked = () => {
    /* remove(_id); */
    const ok = window.confirm("Are you Sure?");
    if (ok) {
      remove(_id);
    }
  };

  return (
    <>
      <li className="project-item-container">
        <img className="project-item-image" src={imageUri} alt={`${_id}`} />

        <div className="project-item-details-container">
          <div className="icons-container">
            {/* <SlLike className="icon button3" />
            <SlDislike className="icon button3" />
            <TfiComments className="icon button3" />
            <CiSaveDown2 className="icon button3" /> */}
          </div>
          <h1 className="project-item-title">{title.slice(0, 50)}...</h1>
          <Link
            to={{ pathname: `/view/${_id}`, state: [projectDetails] }}
            className="project-item-description"
          >
            <p>
              {description.slice(0, 150)}
              <span className="slice">...more</span>
            </p>
          </Link>

          <div className="edit-delete">
            <Link
              to={{ pathname: `/edit/${_id}`, state: [projectDetails] }}
              className="button"
            >
              Edit
            </Link>

            <button type="button" className="button" onClick={removeClicked}>
              Remove
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default MyPostItem;
