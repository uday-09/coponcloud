import { Component } from "react";
import Cookies from "js-cookie";
import TabItem from "../TabItem";
import PostItem from "../PostItem";
import "./index.css";
/* import { useSelector } from "react-redux";
/* import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; */
import api from "../../Api/api";
import axios from "axios";
import Header from "../Header";
import Loader from "react-loader-spinner";
import callLikeApi from "../../Api/likeApi";
import callUnlikeApi from "../../Api/unLikeApi";
// import ErrorPage from "../DisplayError/ErrorPage";
import { connect } from "react-redux";
import { addUser } from "../../redux/features/userSlice";
import ErrorPage from "../ErrorPage";
import { Typography } from "antd";

const tabsList = [
  { tabId: "FEED", displayText: "Feed" },
  { tabId: "TRENDING", displayText: "Today's" },
  /*  { tabId: "SAVE", displayText: "My Saves" } */
];

class Feed extends Component {
  state = {
    display: tabsList[0].tabId,
    feedPosts: [],
    error: "",
    isFetching: true,
    res: [],
    userInfo: {},
    toggled: false,
  };

  takingSearchInput = (event) => {
    this.setState({ search: event.target.value });
  };

  isActive = (activated) => this.setState({ display: activated });

  /* --------------------Api calls------------------ */

  fetchFeed = async () => {
    const token = Cookies.get("token");
    try {
      const result = await api.get("/feed/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("result---->", result);
      var user = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.setState({
        res: this.shuffledEmojisList(result.data.feedPosts),
        isFetching: false,
        userInfo: { ...user.data },
        error: "",
      });
    } catch (err) {
      this.setState({ isFetching: false });
      if (err?.response?.data) {
        this.setState({ error: err.response.data });
      } else {
        console.log("Comes here");
        this.setState({
          error: "Something went wrong. Try again",
        });
      }
    }
  };

  fetchUser = async () => {
    const token = Cookies.get("token");
    try {
      const result = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({ ...result.data });
      this.props.dispatch(addUser({ ...result.data }));
      Cookies.set("user_id", result.data._id, { expires: 30 });
    } catch (err) {
      console.log(err);
      console.log(err?.response);
    }
  };

  componentDidMount() {
    this.fetchUser();
    this.fetchFeed();
  }

  //-----------------------likes-------------------

  thisIsLiked = (id, index) => {
    const newState = this.state;
    newState.res[index].likes = [
      ...newState.res[index].likes,
      newState.userInfo._id,
    ];
    this.setState(newState);
    callLikeApi(id)
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(JSON.parse(err.message).message);
      });
  };

  unLike = (id, index) => {
    const newState = this.state;
    const likesArray = newState.res[index].likes;
    let findIndex = likesArray.indexOf(this.state.userInfo._id);
    if (findIndex > -1) {
      likesArray.splice(findIndex, 1);
    }
    newState.res[index].likes = likesArray;
    this.setState(newState);
    callUnlikeApi(id)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  //-----------------shuffle------------------------

  shuffledEmojisList = (res) => {
    return res.sort(() => Math.random() - 0.5);
  };

  //-----------------Trending----------------

  getTrending = () => {
    let { res } = this.state;

    res = this.shuffledEmojisList(res);
    const date = new Date();

    const trending = res.filter((each) => {
      console.log(
        each.createdAt.toString().substring(0, 10),
        date.toISOString().substring(0, 10)
      );
      return (
        each.createdAt.toString().substring(0, 10) ===
        date.toISOString().substring(0, 10)
      );
    });
    console.log(trending);
    return trending;
  };

  render() {
    const { display, res, userInfo } = this.state;
    console.log(this.state);

    if (this.state.error) {
      return (
        <div>
          <Header></Header>
          <ErrorPage errorMessage={"OOPS! Something went wrong"}></ErrorPage>
        </div>
      );
    }
    if (res.length === 0) {
      return (
        <div>
          <Header></Header>
          <ErrorPage
            errorMessage={"Currently we have No feed posts to show!"}
          ></ErrorPage>
        </div>
      );
    }

    if (res.length !== 0) {
      console.log(this.getTrending());
      return (
        <>
          <Header />
          <ul className="search-tabs-container">
            <div className="tabs-container">
              {tabsList.map((tabDetails) => (
                <TabItem
                  key={tabDetails.tabId}
                  tabDetails={tabDetails}
                  isActive={this.isActive}
                  highlight={tabDetails.tabId === display}
                />
              ))}
            </div>
          </ul>
          <ul className="project-list-container">
            {display === "TRENDING" ? (
              <>
                {this.getTrending().length === 0 ? (
                  <>
                    <Typography.Text>No post to show!</Typography.Text>
                  </>
                ) : (
                  this.getTrending().map((projectDetails, index) => (
                    <PostItem
                      key={projectDetails._id}
                      userId={userInfo._id}
                      projectDetails={projectDetails}
                      thisIsLiked={this.thisIsLiked}
                      index={index}
                    />
                  ))
                )}
              </>
            ) : (
              res.map((projectDetails, index) => (
                <PostItem
                  key={projectDetails._id}
                  userId={userInfo._id}
                  projectDetails={projectDetails}
                  thisIsLiked={this.thisIsLiked}
                  index={index}
                  unLikePost={this.unLike}
                />
              ))
            )}
          </ul>
        </>
      );
    }

    if (this.state.isFetching) {
      return (
        <>
          <Header />
          <div className="loader">
            <div className="products-loader-container">
              <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
            </div>
          </div>
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  const user = state.user;
  return { user };
}

export default connect(mapStateToProps)(Feed);

/*backend nundi anni post(latest to old) retrive ayyi postList laki append avvali */

/* prathi post feed lo display cheyyala or trending lo display cheyyala ani classify chei */

/* postlist lo each oject la catergory : "" value FEED/TRENDING ani value icheyyi*/

/* 
  return (
      <>
        <Header />
        <div className="app-container">
          <ul className="search-tabs-container">
            <div className="search-container">
              <input
                type="search"
                onChange={this.takingSearchInput}
                placeholder="Enter #Hashtag"
                className="search-input"
                value={search}
              />
            </div>
            <div className="tabs-container">
              {tabsList.map((tabDetails) => (
                <TabItem
                  key={tabDetails.tabId}
                  tabDetails={tabDetails}
                  isActive={this.isActive}
                  highlight={tabDetails.tabId === display}
                />
              ))}
            </div>
          </ul>

          {/* <ul className="project-list-container">
            {filteredProjectList.map((projectDetails) => (
              <PostItem
                key={projectDetails.projectId}
                projectDetails={projectDetails}
                
              />
            ))}
          </ul> }
          </div>
          </>
        ); */
