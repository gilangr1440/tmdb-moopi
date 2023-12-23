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

import axios from "axios";
import Modal from "./Modal";

interface SwipperState {
  datas?: [];
  visibility?: boolean;
  id_movie?: string;
}

class Swipper extends Component<SwipperState> {
  state = {
    datas: [],
    visibility: false,
    id_movie: "",
  };

  handlePopup(id?: string) {
    const { visibility } = this.state;
    this.setState({ id_movie: id });
    this.setState({ visibility: !visibility });
  }

  getNowPlayingMovies() {
    axios
      .get("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
        },
      })
      .then((response) => {
        const dataResults = response.data.results;
        this.setState({ datas: dataResults });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount(): void {
    this.getNowPlayingMovies();
  }

  render() {
    const { datas, visibility, id_movie } = this.state;
    const dataSlice = datas.slice(0, 5);
    return (
      <div className="h-full">
        <Swiper autoplay={{ delay: 3000 }} navigation={true} modules={[Navigation, Autoplay]} className="mySwiper">
          {dataSlice &&
            dataSlice.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <button onClick={() => this.handlePopup(item.id)} className="absolute z-10 text-4xl p-3 bg-slate-500 bg-opacity-30 text-white">
                    {item.title}
                  </button>
                  <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} />
                </SwiperSlide>
              );
            })}
        </Swiper>
        {visibility ? (
          datas &&
          datas.map((item: any, index: number) => {
            if (item.id == id_movie) {
              return <Modal key={index} id_props={item.id} image={item.poster_path} title={item.title} release={item.release_date} desc={item.overview} showModal={() => this.handlePopup()} />;
            }
          })
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Swipper;
