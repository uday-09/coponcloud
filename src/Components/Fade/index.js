import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Fade extends Component {
  render() {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div>
        {/*  <h2>Fade</h2> */}
        <Slider {...settings}>
          <div>
            <img
              src="https://p0.piqsels.com/preview/908/994/396/beach-blur-boardwalk-boat-thumbnail.jpg"
              alt="courosal"
            />
          </div>
          <div>
            <img
              src="https://p0.piqsels.com/preview/908/994/396/beach-blur-boardwalk-boat-thumbnail.jpg"
              alt="courosal"
            />
          </div>
          <div>
            <img
              src="https://p0.piqsels.com/preview/908/994/396/beach-blur-boardwalk-boat-thumbnail.jpg"
              alt="courosal"
            />
          </div>
          <div>
            <img
              src="https://p0.piqsels.com/preview/908/994/396/beach-blur-boardwalk-boat-thumbnail.jpg"
              alt="courosal"
            />
          </div>
        </Slider>
      </div>
    );
  }
}

export default Fade;
