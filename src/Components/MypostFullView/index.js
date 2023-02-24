import { Component } from "react";
import Header from "../Header";
import "./index.css";

import { Link } from "react-router-dom";
import Cookies from "js-cookie";

class MypostFullView extends Component {
  state = { post: this.props.location.state[0] };
  render() {
    const { post } = this.state;
    const { _id, imageUri, title, description, tags, updatedAt, postedBy } =
      post;

    const user_id = Cookies.get("user_id");
    console.log(user_id, user_id === postedBy.toString(), _id);

    console.log(post);

    return (
      <>
        <Header />
        <div className="full-view-main-container">
          <div className="project-item-container-full-view">
            <img
              className="project-item-image"
              src={imageUri}
              alt={`project-item ${_id}`}
            />

            <div className="project-item-details-container-full-view">
              <p className="project-item-description">
                {updatedAt.toString().substring(0, 10)}
              </p>
              <b>
                <h1 className="project-item-title">{title}</h1>
              </b>
              <p className="project-item-description">{description}</p>
              <p className="hashtags-container">{tags.toString()}</p>

              <div className="buttons-container">
                {user_id === postedBy.toString() ? (
                  <>
                    <Link to="/myposts">
                      <button type="button" className="button">
                        back
                      </button>
                    </Link>
                    <Link to={{ pathname: `/edit/${_id}`, state: [post] }}>
                      <button type="button" className="button">
                        edit
                      </button>
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MypostFullView;
