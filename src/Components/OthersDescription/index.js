import { Component } from "react";

class MyDescription extends Component {
  render() {
    const { userProfile } = this.props;

    const { email, username, bio, profilePic } = userProfile;

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
