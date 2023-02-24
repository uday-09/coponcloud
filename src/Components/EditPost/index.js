import { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import Cookies from "js-cookie";

class Login extends Component {
  componentDidMount() {
    console.log(this.props.location);
  }
  state = {
    _id: this.props.location.state[0]._id,
    title: this.props.location.state[0].title,
    description: this.props.location.state[0].description,
    hashtags: this.props.location.state[0].tags,
    files: "",
    isLoading: false,
    error: "",
    success: "",
  };

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };
  onChangefiles = (event) => {
    this.setState({ files: event.target.files[0] });
  };
  onChangeHashtags = (event) => {
    this.setState({ hashtags: event.target.value });
  };

  renderPostTitle = () => {
    const { title } = this.state;
    return (
      <input
        type="text"
        className="password-input-filed"
        value={title}
        onChange={this.onChangeTitle}
        placeholder="Enter Title"
      />
    );
  };
  renderPostDescription = () => {
    const { description } = this.state;
    return (
      <textarea
        rows={6}
        type="password"
        className="username-input-filed2"
        value={description}
        onChange={this.onChangeDescription}
        placeholder="Enter Descritpion"
      />
    );
  };

  renderHashTags = () => {
    const { hashtags } = this.state;
    return (
      <input
        type="text"
        className="username-input-filed"
        value={hashtags}
        onChange={this.onChangeHashtags}
        placeholder="Enter #hashtags"
      />
    );
  };

  renderImages = () => {
    return (
      <input
        type="file"
        className="username-input-filed"
        /* value={files} */
        onChange={this.onChangefiles}
        placeholder="choose"
      />
    );
  };

  onsubmit = async (event) => {
    event.preventDefault();
    /* back end related code for submitting the post */

    const { title, description, files, _id, hashtags } = this.state;
    let formData = new FormData();
    formData.append("image", files);
    /*  console.log(title, description, hashtags, files); */
    const token = Cookies.get("token");
    console.log(_id);
    try {
      this.setState({ error: "" });
      if (!files || !description || !title) {
        this.setState({
          error:
            "You must fill all the data required (title, description, image)",
        });
        return;
      }
      this.setState({ isLoading: true });
      const imageResult = await axios.post(
        "http://localhost:3500/post/crime/picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(imageResult.data);
      await axios.patch(
        `http://localhost:3500/post/update/${_id}`,
        {
          title,
          description,
          tags: hashtags,
          imageUri: imageResult.data.imageUri,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.setState({
        success: "Your post has been succesfully uploaded",
        error: "",
        isLoading: false,
        title: "",
        description: "",
        hashtags: "",
        files: "",
      });
    } catch (err) {
      // this.setState({ isLoading: false });
      if (err?.response?.data) {
        return this.setState({
          ...this.state,
          isLoading: false,
          error: err?.response?.data.message,
        });
      }
      this.setState({
        ...this.state,
        isLoading: false,
        error: "Something went wrong try again.",
        success: "",
      });
    }
  };

  render() {
    return (
      <div className="login-form-container">
        <img
          src="https://img.freepik.com/free-vector/tiny-author-with-pencil-writing-editing-information-hand-holding-open-paper-book-study-flat-vector-illustration-guidance-education-concept-banner-website-design-landing-web-page_74855-25322.jpg?w=900&t=st=1669917630~exp=1669918230~hmac=384dd641c693fec4fdce510b6a83ff795dfbff97d4121f439815cdda409202a0"
          className="login-website-logo-mobile-image"
          alt="upload"
        />
        <img
          src="https://img.freepik.com/free-vector/tiny-author-with-pencil-writing-editing-information-hand-holding-open-paper-book-study-flat-vector-illustration-guidance-education-concept-banner-website-design-landing-web-page_74855-25322.jpg?w=900&t=st=1669917630~exp=1669918230~hmac=384dd641c693fec4fdce510b6a83ff795dfbff97d4121f439815cdda409202a0"
          className="login-image"
          alt="upload"
        />
        <form className="form-container" onSubmit={this.onsubmit}>
          <h1>Enter Changes</h1>
          <div className="input-container">{this.renderPostTitle()}</div>
          <div className="input-container">{this.renderPostDescription()}</div>
          <div className="input-container">{this.renderHashTags()}</div>
          <div className="input-container">{this.renderImages()}</div>
          {this.state.error ? (
            <>
              <p className="error-text">{this.state.error}</p>
            </>
          ) : null}

          {this.state.success ? (
            <>
              <p className="success_message">{this.state.success}</p>
            </>
          ) : null}

          {this.state.isLoading ? (
            <>
              <div className="loading-login-button">
                <Loader
                  type="ThreeDots"
                  color="#0b69ff"
                  height="50"
                  width="50"
                />
              </div>
            </>
          ) : (
            <>
              <button type="submit" className="login-button">
                Post
              </button>
            </>
          )}
          <br />
          <Link to="/myposts">back </Link>
        </form>
      </div>
    );
  }
}

export default Login;
