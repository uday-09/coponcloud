import { Component } from "react";
import MyPostItem from "../MyPostItem";
/* import { v4 as uuidv4 } from "uuid"; */
import Header from "../Header";
import MyDescription from "../MyDescription";
import Cookies from "js-cookie";
import "./index.css";
import axios from "axios";
import api from "../../Api/api";

class MyPost extends Component {
  state = { error: "", myPosts: [], toggle: false };

  remove = async (id) => {
    const token = Cookies.get("token");
    try {
      await api.delete(`/delete/mypost/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.componentDidMount();

      /* this.setState({ myPosts: updated }); */
    } catch (err) {
      console.log(err.response);
    }
  };

  async componentDidMount() {
    const token = Cookies.get("token");
    try {
      const result = await api.get("/my/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result.data);
      this.setState({ myPosts: result.data.posts });
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

    return (
      <div className="app-container">
        <Header />
        <MyDescription />

        <h1 className="my-posts-heading">My posts</h1>
        <ul className="project-list-container">
          {error ? (
            <h2 className="error-text">{error}</h2>
          ) : (
            <>
              {filteredProjectList.map((projectDetails) => (
                <MyPostItem
                  key={projectDetails._id}
                  projectDetails={projectDetails}
                  remove={this.remove}
                />
              ))}
            </>
          )}
        </ul>
      </div>
    );
  }
}

export default MyPost;

/*  <img
          src="https://t3.ftcdn.net/jpg/01/03/88/68/240_F_103886826_ZrNWoPPbMO74p06IvKS48zSHK4FqqelF.jpg"
          alt="user-profile-picutre"
          className="user-main-profile-picture"
        />
        <h1 className="title">Username</h1>
        <p className="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </p>
 */
