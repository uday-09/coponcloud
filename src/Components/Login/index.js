import { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { Link, Redirect } from "react-router-dom";
/* import Fade from "../Fade"; */
import api from "../../Api/api";
import { Button } from "antd";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    loading: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    );
  };

  onSuccessfull = () => {
    const { history } = this.props;
    history.replace("/");
  };

  onsubmit = async (event) => {
    event.preventDefault();
    console.log("submit triggered");
    this.setState({ error: "" });
    try {
      this.setState({ loading: true });
      const result = await api.post("/user/login", {
        username: this.state.username,
        password: this.state.password,
      });
      console.log(result.data);

      const { history } = this.props;
      Cookies.set("token", result.data.token, { expires: 30 });
      console.log(result.data.token);
      history.replace("/feed");
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        this.setState({ error: err.response.data.message });
      }
    } finally {
      this.setState({ loading: false });
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
    const { error } = this.state;
    return (
      <>
        <div className="login-form-container">
          <img
            src="assets/logo.png"
            className="login-website-logo-mobile-image"
            alt="website logo"
          />
          <img
            src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?w=740&t=st=1669738881~exp=1669739481~hmac=b1d0a7a6487daae030828c5b3796ffbff4733a7c919d407b4946414f63a59f98"
            className="login-image"
            alt="website login"
          />
          {/*  <div className="fade-container">
          {" "}
          <Fade />
        </div> */}
          <form className="form-container" onSubmit={this.onsubmit}>
            {/* <img
            src="assets/logo.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          /> */}
            <h1>Enter Credentials</h1>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            {error !== "" ? <p className="error-text">*{error}</p> : null}
            {/* <button type="submit" className="login-button">
              Login
            </button> */}

            <Button
              type="primary"
              loading={this.state.loading}
              onClick={this.onsubmit}
              style={{ marginTop: 10, width: "100%" }}
            >
              Login
            </Button>

            <br />
            <Link to="/signup">Didn't have an account ? </Link>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
