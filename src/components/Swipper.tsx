import { useEffect, useState } from "react";
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

const Swipper = () => {
  const [datas, setDatas] = useState<[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [idMovie, setIdMovie] = useState<string>("");

  function handlePopup(id: string = "") {
    setIdMovie(id);
    setVisibility(!visibility);
  }

  function getNowPlayingMovies() {
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
        setDatas(dataResults);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  const dataSlice = datas.slice(0, 5);

  return (
    <div className="h-full">
      <Swiper autoplay={{ delay: 3000 }} navigation={true} modules={[Navigation, Autoplay]} className="mySwiper">
        {dataSlice &&
          dataSlice.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <button onClick={() => handlePopup(item.id)} className="absolute z-10 text-4xl p-3 bg-slate-500 bg-opacity-30 text-white">
                  {item.title}
                </button>
                <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} />
              </SwiperSlide>
            );
          })}
      </Swiper>
      {visibility ? (
        datas &&
        datas.map((item: any, index: number) => {
          if (item.id == idMovie) {
            return <Modal key={index} id_props={item.id} image={item.poster_path} title={item.title} release={item.release_date} desc={item.overview} showModal={() => handlePopup()} />;
          }
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Swipper;
