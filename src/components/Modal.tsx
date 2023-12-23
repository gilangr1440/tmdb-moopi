import axios from "axios";
import { Component } from "react";
import Trailer from "./Trailer";

interface ModalProps {
  showModal: () => void;
  image: string;
  title: string;
  release: string;
  desc: string;
  trailerDatas?: [];
  id_props: number;
}

export class Modal extends Component<ModalProps> {
  state = {
    trailerDatas: [],
  };

  getVideoMovie(id: number) {
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
        this.setState({ trailerDatas: trailerDataResults });
        console.log(trailerDataResults);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount(): void {
    this.getVideoMovie(this.props.id_props);
  }

  render() {
    const { showModal, image, title, release, desc } = this.props;
    const { trailerDatas } = this.state;

    return (
      <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-1/2 bg-white p-6 rounded-lg">
          <div className="flex gap-8">
            <img className="w-1/2" src={`https://image.tmdb.org/t/p/original/${image}`} alt="image" />
            <div>
              <ul>
                <li className="mb-2">Title: {title}</li>
                <li className="mb-2">Release Date: {release}</li>
                <li className="mb-2">Description: {desc}</li>
              </ul>
              {trailerDatas &&
                trailerDatas.map((item: any, index: number) => {
                  if (index == 0) {
                    return <Trailer key={index} id_video={item.key} />;
                  }
                })}
            </div>
          </div>
          <button className="mt-4 h-10 float-end bg-blue-500 hover:bg-blue-600 text-white text-center font-bold p-2 rounded" onClick={showModal}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
