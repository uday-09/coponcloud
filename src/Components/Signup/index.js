import { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { Link, Redirect } from "react-router-dom";
import api from "../../Api/api";

class Login extends Component {
  state = {
    username: "",
    password: "",
    about: "",
    gmail: "",
    error: "",
    location: "none",
    name: "anonymous",
    successMessage: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onChangeAbout = (event) => {
    this.setState({ about: event.target.value });
  };
  onChangeGmail = (event) => {
    this.setState({ gmail: event.target.value });
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <input
        type="password"
        className="password-input-filed"
        value={password}
        onChange={this.onChangePassword}
        placeholder="Enter Password"
      />
    );
  };
  renderAboutField = () => {
    const { about } = this.state;
    return (
      <textarea
        rows={10}
        type="text"
        className="username-input-filed2"
        value={about}
        onChange={this.onChangeAbout}
        placeholder="Tell us about Yourself"
      />
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <input
        type="text"
        className="username-input-filed"
        value={username}
        onChange={this.onChangeUsername}
        placeholder="Enter user name"
      />
    );
  };

  renderGmailField = () => {
    const { gmail } = this.state;
    return (
      <input
        type="text"
        className="username-input-filed"
        value={gmail}
        onChange={this.onChangeGmail}
        placeholder="Enter Gmail"
      />
    );
  };

  onSuccessfull = () => {
    const { history } = this.props;
    history.replace("/");
  };

  onsubmit = async (event) => {
    event.preventDefault();
    /*     console.log("submit triggered");
     */
    try {
      const result = await api.post("/user", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.gmail,
        location: this.state.location,
        name: this.state.name,
        bio: this.state.about,
      });
      console.log(result.data);
      const { history } = this.props;
      Cookies.set("token", result.data.token, { expires: 30 });
      console.log(result.data.token);
      history.replace("/feed");
    } catch (err) {
      console.log(err, err.response.data);
      if (err?.response?.data) {
        this.setState({ error: err.response.data.message });
      } else {
        this.setState({ error: "Something went wrong" });
      }
    }
    /*
    const { username, password } = this.state;
    const userDetails = { username, password };

    const url = ".......";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    if (response.ok === true) {
      this.onSuccessfull();
    } */
  };

  render() {
    const token = Cookies.get("token");
    if (token !== undefined) {
      return <Redirect to="/feed" />;
    }
    return (
      <div className="login-form-container">
        <img
          src="https://zumaxdigital.com/wp-content/uploads/2020/03/tab-image1.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://zumaxdigital.com/wp-content/uploads/2020/03/tab-image1.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.onsubmit}>
          <h3>Enter Details to create an account</h3>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="input-container">{this.renderAboutField()}</div>

          <div className="input-container">{this.renderGmailField()}</div>
          {this.state.error !== "" ? (
            <p className="error-text">*{this.state.error}</p>
          ) : null}
          <button type="submit" className="login-button">
            Register
          </button>
          <br />
          <Link to="/login">Already have an account ? </Link>
        </form>
      </div>
    );
  }
}

export default Login;
