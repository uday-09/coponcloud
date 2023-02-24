import "./index.css";
import Header from "../Header";
import ReactPlayer from "react-player";
import { Component } from "react";

const videoURL = "https://www.youtube.com/watch?v=OTQ1pNm9nsI";
class Help extends Component {
  state = {
    isPlaying: false,
  };

  onClickPlay = () => {
    this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }));
  };

  render() {
    const { isPlaying } = this.state;
    const btnText = isPlaying ? "Pause" : "Play";

    return (
      <>
        <Header />
        <div className="videoplayer-main-conainer">
          <div className="video-container">
            <h1 className="heading">Video Guide</h1>
            <div className="responsive-container">
              <ReactPlayer url={videoURL} playing={isPlaying} />
            </div>
            <button type="button" className="button" onClick={this.onClickPlay}>
              {btnText}
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Help;
