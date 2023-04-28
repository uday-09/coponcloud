import { Component } from "react";
import Loader from "react-loader-spinner";
import "./index.css";
import { Link } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import Cookies from "js-cookie";
import api from "../../Api/api";

class Login extends Component {
  state = {
    username: "",
    bio: "",
    file: "",
    loading: true,
    email: "",
    isLoading: false,
    success: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangedescription = (event) => {
    this.setState({ bio: event.target.value });
  };

  onChangeGmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangefiles = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <input
        type="text"
        className="username-input-filed"
        value={username}
        onChange={this.onChangeUsername}
        placeholder="Edit username"
      />
    );
  };
  renderEditDescription = () => {
    const { bio } = this.state;
    return (
      <textarea
        rows={6}
        type="text"
        className="username-input-filed2"
        value={bio}
        onChange={this.onChangedescription}
        placeholder="Edit Bio"
      />
    );
  };

  renderProfileField = () => {
    return (
      <>
        <label htmlFor="for">Upload Profile Picture</label>
        <br />
        <input
          id="for"
          type="file"
          className="username-input-filed"
          onChange={this.onChangefiles}
        />
      </>
    );
  };

  renderGmail = () => {
    const { email } = this.state;
    return (
      <input
        id="for"
        type="text"
        className="username-input-filed2"
        value={email}
        onChange={this.onChangeGmail}
        placeholder="Edit Gmail"
      />
    );
  };

  onSuccessfull = () => {
    const { history } = this.props;
    history.replace("/");
  };

  onsubmit = async (event) => {
    event.preventDefault();
    const { username, bio, email, file } = this.state;
    let formData = new FormData();
    formData.append("image", file);
    const token = Cookies.get("token");
    try {
      this.setState({ error: "" });
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
      await api.patch(
        "/user/update/me",
        {
          email,
          username,
          bio,
          profilePic: imageResult.data.imageUri,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.setState({
        success: "Your profile has been uploaded",
        error: "",
        isLoading: false,
      });
    } catch (err) {
      // this.setState({ isLoading: false });
      console.log(err);
      console.log(err.response.data);
      if (err?.response?.data) {
        return this.setState({
          isLoading: false,
          error: err?.response?.data.message,
        });
      }
      this.setState({
        isLoading: false,
        error: "Something went wrong try again.",
        success: "",
      });
    }
  };

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  async componentDidMount() {
    const token = Cookies.get("token");
    try {
      const user = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({ ...user.data, loading: false });
    } catch (err) {
      console.log(err.response);
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        <Header />
        <div className="login-form-container">
          <img
            src="https://img.freepik.com/free-vector/tiny-author-with-pencil-writing-editing-information-hand-holding-open-paper-book-study-flat-vector-illustration-guidance-education-concept-banner-website-design-landing-web-page_74855-25322.jpg?w=900&t=st=1669912781~exp=1669913381~hmac=0d67a4f96b410481639eb024126a9627b0897077cb7ef375e4d955fa2d7cedfb"
            className="login-website-logo-mobile-image"
            alt="website logo"
          />
          <img
            src="https://img.freepik.com/free-vector/tiny-author-with-pencil-writing-editing-information-hand-holding-open-paper-book-study-flat-vector-illustration-guidance-education-concept-banner-website-design-landing-web-page_74855-25322.jpg?w=900&t=st=1669912781~exp=1669913381~hmac=0d67a4f96b410481639eb024126a9627b0897077cb7ef375e4d955fa2d7cedfb"
            className="login-image"
            alt="edit-bio"
          />
          {loading ? (
            this.renderLoader()
          ) : (
            <form className="form-container" onSubmit={this.onsubmit}>
              <h1>Edit Your Details</h1>
              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderEditDescription()}
              </div>
              <div className="input-container">{this.renderProfileField()}</div>
              <div className="input-container">{this.renderGmail()}</div>

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
                    Apply Changes
                  </button>
                </>
              )}

              <Link to="/myposts">Back</Link>
              <br />
            </form>
          )}
        </div>
      </>
    );
  }
}

export default Login;
