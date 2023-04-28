import { Component } from "react";
import "./index.css";

import Header from "../Header";
import Cookies from "js-cookie";
import api from "../../Api/api";
import OthersDescription from "../OthersDescription";
import OthersPosts from "../OthersPosts";

class User extends Component {
  state = { error: "", myPosts: [], userProfile: {} };

  async componentDidMount() {
    const id = this.props.location.state[0];
    console.log(this.props.location, "**");
    console.log(id);
    const token = Cookies.get("token");
    try {
      const result = await api.get(
        `/user/details/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result.data);
      this.setState({
        myPosts: result.data.posts,
        userProfile: result.data.user,
      });
    } catch (err) {
      console.log(err.response.data);
      if (err?.response?.data) {
        this.setState({ error: err.response.data.message });
      } else {
        this.setState({ error: "Something went wrong" });
      }
    }
  }

  getFiltered = () => {
    const { myPosts: filteredProjectList } = this.state;
    return filteredProjectList;
  };

  render() {
    const { error } = this.state;
    const filteredProjectList = this.getFiltered();

    /* console.log(this.state.myPosts); */

    return (
      <div className="app-container">
        <Header />
        <OthersDescription userProfile={this.state.userProfile} />

        <h1 className="my-posts-heading">Posts</h1>
        <ul className="project-list-container">
          {error ? (
            <h2 className="error-text">{error}</h2>
          ) : (
            <>
              {filteredProjectList.map((projectDetails) => (
                <OthersPosts
                  key={projectDetails._id}
                  projectDetails={projectDetails}
                />
              ))}
            </>
          )}
        </ul>
      </div>
    );
  }
}

export default User;
