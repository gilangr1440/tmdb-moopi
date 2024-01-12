import axios from "axios";
import { FC, useEffect, useState } from "react";
import Trailer from "./Trailer";
import { Link } from "react-router-dom";
import { ModalProps } from "../utils/component";
import Swal from "sweetalert2";

const Modal: FC<ModalProps> = ({ showModal, image, title, release, desc, id_props }) => {
  const [trailerDatas, setTrailerDatas] = useState<[]>([]);
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const userId = import.meta.env.VITE_USER_ID;

  function getVideoMovie(id: number) {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
        },
      })
      .then((response) => {
        const trailerDataResults = response.data.results;
        setTrailerDatas(trailerDataResults);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addToFavoriteMovie(id: number) {
    axios
      .post(
        `account/${userId}/favorite`,
        {
          media_type: "movie",
          media_id: id,
          favorite: true,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "Added",
          text: "Success add favorite movie",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getVideoMovie(id_props);
  }, []);

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 bg-white p-6 rounded-lg">
        <div className="flex gap-8">
          <img className="w-1/2" src={`https://image.tmdb.org/t/p/original/${image}`} alt="image" />
          <div>
            <ul>
              <li className="mb-2">Title: {title}</li>
              <li className="mb-2">Release Date: {release}</li>
              <li className="mb-2">
                Description: {desc}
                {"\n"}
                <Link to="/detail" state={{ id: `${id_props}` }} className="hover:text-yellow-300">
                  More...
                </Link>
              </li>
            </ul>
            {trailerDatas &&
              trailerDatas.map((item: any, index: number) => {
                if (index == 0) {
                  return <Trailer key={index} id_video={item.key} />;
                }
              })}
          </div>
        </div>
        <button className="mt-4 mx-3 h-8 float-end bg-slate-500 hover:bg-slate-600 text-white text-center font-bold p-2 rounded" onClick={() => addToFavoriteMovie(id_props)}>
          Favorite
        </button>
        <button className="mt-4 mx-3 h-8 float-end bg-slate-500 hover:bg-slate-600 text-white text-center font-bold p-2 rounded" onClick={showModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
