import React, { Component } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "../styles.css";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

import img from "../dummy/movie.json";

class Swipper extends Component {
  render() {
    return (
      <div className="h-full">
        <Swiper autoplay={{ delay: 3000 }} navigation={true} modules={[Navigation, Autoplay]} className="mySwiper">
          {img &&
            img.map((item: any) => {
              return (
                <SwiperSlide>
                  <h1 className="absolute z-10 text-4xl text-white">{item.Title}</h1>
                  <img src={item.Poster} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    );
  }
}

export default Swipper;
