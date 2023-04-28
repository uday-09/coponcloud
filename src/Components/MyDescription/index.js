import { Link } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";
import { Component } from "react";
import api from "../../Api/api";

class MyDescription extends Component {
  state = { username: "", bio: "", email: "", profilePic: "" };
  async componentDidMount() {
    const token = Cookies.get("token");

    try {
      const result = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({ ...result.data });
    } catch (err) {
      console.log(err);
      console.log(err?.response);
    }
  }

  render() {
    const { username, bio, email, profilePic } = this.state;
    console.log(this.state);
    return (
      <>
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-heading">{username}</h1>
            <h3>{email}</h3>
            {/*  <p>{location}</p> */}

            <img
              src={
                profilePic
                  ? profilePic
                  : "https://t3.ftcdn.net/jpg/01/03/88/68/240_F_103886826_ZrNWoPPbMO74p06IvKS48zSHK4FqqelF.jpg"
              }
              alt="profile-pic"
              className="home-mobile-img"
            />
            <p className="home-description">{bio}</p>
            <div className="buttons-container">
              <Link
                to={{
                  pathname: "/editbio",
                  state: [{ ...this.state }],
                }}
              >
                <button type="button" className="button button2">
                  Edit Bio
                </button>
              </Link>
              <Link to="/post">
                <button type="button" className="button button2">
                  New Post
                </button>
              </Link>
            </div>
          </div>
          <img
            src={
              profilePic
                ? profilePic
                : "https://t3.ftcdn.net/jpg/01/03/88/68/240_F_103886826_ZrNWoPPbMO74p06IvKS48zSHK4FqqelF.jpg"
            }
            alt="My-Profile"
            className="home-desktop-img"
          />
        </div>
      </>
    );
  }
}

export default MyDescription;
