import { Component } from "react";

import Header from "../Header";
import "./index.css";

class EachPostItem extends Component {
  state = { postDetails: this.props.location.state[0] };

  renderBlogItemDetails = () => {
    const { postDetails } = this.state;
    const {
      title,
      imageUri,
      description,
      profilePic,
      username,
      updatedAt,
      tags,
      date,
    } = postDetails;

    return (
      <div className="blog-info">
        <div className="author-details">
          <img
            className="author-pic"
            src={
              profilePic
                ? profilePic
                : "https://blog.ipleaders.in/wp-content/uploads/2021/07/Murder.jpg"
            }
            alt={username}
          />

          <div className="usernameAndDate-container">
            <p className="details-author-name">{username}</p>
            <p className="details-author-date">
              {updatedAt.toString().substring(0, 10)}
            </p>
          </div>
        </div>

        <img className="blog-image" src={imageUri} alt={title} />
        <p>{date}</p>
        <h2 className="blog-details-title">{title}</h2>

        <p className="blog-content">{description}</p>
        <p className="tags">{tags}</p>
      </div>
    );
  };

  render() {
    return (
      <>
        <Header />
        <div className="blog-container">{this.renderBlogItemDetails()}</div>
      </>
    );
  }
}

export default EachPostItem;
