import { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";
import api from "../../Api/api";

class Login extends Component {
  state = {
    title: "",
    description: "",
    hashtags: "",
    files: "",
    error: "",
    success: "",
    isLoading: false,
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
        // value={files}
        onChange={this.onChangefiles}
        placeholder="choose"
      />
    );
  };

  onsubmit = async (event) => {
    event.preventDefault();
    /* back end related code for submitting the post */

    const { title, description, hashtags, files } = this.state;
    const tags = hashtags.split(" ");
    console.log(tags);
    let formData = new FormData();
    formData.append("image", files);
    /*  console.log(title, description, hashtags, files); */
    const token = Cookies.get("token");

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
      const imageResult = await api.post(
        "/post/crime/picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(imageResult.data);
      await api.post(
        "/crime/post",
        {
          title,
          description,
          tags,
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
      console.log(err)
      this.setState({
        isLoading: false,
        error: "Something went wrong try again.",
        success: "",
      });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="login-form-container">
        <img
          src="https://img.freepik.com/free-vector/hand-postman-putting-letter-envelope-into-open-mailbox-courier-delivering-mail-flat-vector-illustration-correspondence-communication-profession-newsletter-concept-banner-website-design_74855-24713.jpg?w=1060&t=st=1669915864~exp=1669916464~hmac=fa0f8c626f5b896495c6c3dcbc9f6d0a1f8f2cff8c48ca75c3a2ae99453f0970"
          className="login-website-logo-mobile-image"
          alt="upload"
        />
        <img
          src="https://img.freepik.com/free-vector/hand-postman-putting-letter-envelope-into-open-mailbox-courier-delivering-mail-flat-vector-illustration-correspondence-communication-profession-newsletter-concept-banner-website-design_74855-24713.jpg?w=1060&t=st=1669915864~exp=1669916464~hmac=fa0f8c626f5b896495c6c3dcbc9f6d0a1f8f2cff8c48ca75c3a2ae99453f0970"
          className="login-image"
          alt="upload"
        />
        <form className="form-container" onSubmit={this.onsubmit}>
          <h1>Enter Details</h1>
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

          {/* <button type="submit" className="login-button">
            {this.state.isLoading ? (
              <>
                <div className="loader">
                  <div className="products-loader-container">
                    <Loader
                      type="ThreeDots"
                      color="#0b69ff"
                      height="50"
                      width="50"
                    />
                  </div>
                </div>
              </>
            ) : (
              `Post`
            )}
          </button> */}
          <br />
          <Link to="/myposts">back </Link>
        </form>
      </div>
    );
  }
}

export default Login;

/* import { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    title: "",
    description: "",
    hashtags: "",
    files: "",
  };

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  };
  onChangefiles = (event) => {
    this.setState({ files: event.target.value });
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
    const { files } = this.state;
    return (
      <input
        type="file"
        className="username-input-filed"
        value={files}
        onChange={this.onChangefiles}
        placeholder="choose"
      />
    );
  }; */

//submit = async (event) => {
//event.preventDefault();
/* back end related code */
//};

/* render() {
    return (
      <div className="login-form-container">
        <img
          src="https://img.freepik.com/free-vector/hand-postman-putting-letter-envelope-into-open-mailbox-courier-delivering-mail-flat-vector-illustration-correspondence-communication-profession-newsletter-concept-banner-website-design_74855-24713.jpg?w=1060&t=st=1669915864~exp=1669916464~hmac=fa0f8c626f5b896495c6c3dcbc9f6d0a1f8f2cff8c48ca75c3a2ae99453f0970"
          className="login-website-logo-mobile-image"
          alt="upload"
        />
        <img
          src="https://img.freepik.com/free-vector/hand-postman-putting-letter-envelope-into-open-mailbox-courier-delivering-mail-flat-vector-illustration-correspondence-communication-profession-newsletter-concept-banner-website-design_74855-24713.jpg?w=1060&t=st=1669915864~exp=1669916464~hmac=fa0f8c626f5b896495c6c3dcbc9f6d0a1f8f2cff8c48ca75c3a2ae99453f0970"
          className="login-image"
          alt="upload"
        />
        <form className="form-container" onSubmit={this.onsubmit}>
          <h1>Enter Post Details</h1>
          <div className="input-container">{this.renderPostTitle()}</div>
          <div className="input-container">{this.renderPostDescription()}</div>
          <div className="input-container">{this.renderHashTags()}</div>
          <div className="input-container">{this.renderImages()}</div>
          <button type="submit" className="login-button">
            Post
          </button>
          <br />
          <Link to="/myposts">back </Link>
        </form>
      </div>
    );
  }
}

export default Login;
 */
