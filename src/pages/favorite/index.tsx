import React, { Component } from "react";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";

// import data from "./dummy/movie.json";
import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton";
import Swal from "sweetalert2";
import { withRouter } from "../../withRouter";

type Movie = {
  id?: number;
  poster_path?: string;
  title?: string;
  release_date?: string;
  overview?: string;
};

interface FavState {
  visibility?: boolean;
  showSearch?: boolean;
  id_movie?: number;
  movieDetail?: Movie;
  favorites?: never[];
  favoriteSum?: number;
  keywordSearch?: string;
  favPage?: number;
  totalFavPage?: number;
  is_loadingFav?: boolean;
}

interface FavProps {
  navigate: any;
}

export class Favorite extends Component<FavProps, FavState> {
  state = {
    visibility: false,
    showSearch: false,
    id_movie: 0,
    movieDetail: {
      id: 0,
      poster_path: "",
      title: "",
      release_date: "",
      overview: "",
    },
    favorites: [],
    favoriteSum: 0,
    keywordSearch: "",
    favPage: 1,
    totalFavPage: 0,
    is_loadingFav: true,
  };
  handlePopup(id?: number) {
    const { visibility } = this.state;
    this.setState({ id_movie: id });
    this.setState({ visibility: !visibility });
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
        },
      })
      .then((response) => {
        const detailResult = response.data;
        console.log(detailResult);
        this.setState({ movieDetail: detailResult });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  showSearchHandle() {
    const { showSearch } = this.state;
    this.setState({ showSearch: !showSearch });
    console.log(showSearch);
  }
  getFavoritesMovies(page: number) {
    axios
      .get(`https://api.themoviedb.org/3/account/16826831/favorite/movies?language=en-US&page=${page}`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
        },
      })
      .then((response) => {
        const dataFavoriteResults = response.data.results;
        this.setState({ favoriteSum: dataFavoriteResults.length });
        this.setState({ totalFavPage: response.data.total_pages });
        // console.log(this.state.totalFavPage);
        setTimeout(() => {
          this.setState({ favorites: dataFavoriteResults });
          this.setState({ is_loadingFav: false });
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  searchMovies = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { keywordSearch } = this.state;
    const { navigate } = this.props;
    navigate("/search", {
      state: {
        keywordSearch: keywordSearch,
      },
    });
  };
  removeFavoriteMovie(id_movie: number) {
    axios
      .post(
        `https://api.themoviedb.org/3/account/16826831/favorite`,
        {
          media_type: "movie",
          media_id: id_movie,
          favorite: false,
        },
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.setState({ favorites: [] });
        this.setState({ is_loadingFav: true });
        setTimeout(() => {
          this.getFavoritesMovies(this.state.favPage);
        }, 500);
        Swal.fire({
          title: "Removed",
          text: "Success remove favorite movie",
          icon: "warning",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount(): void {
    this.getFavoritesMovies(this.state.favPage);
  }
  nextFavHandle() {
    const { favPage } = this.state;
    this.setState({ favPage: favPage + 1 });
    this.setState({ is_loadingFav: true });
    this.setState({ favorites: [] });
    setTimeout(() => {
      this.getFavoritesMovies(this.state.favPage);
    }, 500);
  }
  prevFavHandle() {
    const { favPage } = this.state;
    this.setState({ favPage: favPage - 1 });
    if (favPage === 0) {
      alert("Out of bound");
      this.setState({ favPage: 1 });
    }
    this.setState({ is_loadingFav: true });
    this.setState({ favorites: [] });
    setTimeout(() => {
      this.getFavoritesMovies(this.state.favPage);
    }, 500);
  }
  render() {
    const { visibility, showSearch, id_movie, movieDetail, favorites, favoriteSum, keywordSearch, favPage, is_loadingFav, totalFavPage } = this.state;
    return (
      <div>
        <Layout showSearch={() => this.showSearchHandle()} searchIcon={showSearch}>
          {showSearch ? (
            <form onSubmit={this.searchMovies} className="w-full absolute z-10 gap-5 flex justify-center items-center bg-white h-10">
              <i className="bx bx-search text-lg"></i>
              <input type="text" value={keywordSearch} className="w-4/5 h-[33px] outline-none" onChange={(e: any) => this.setState({ keywordSearch: e.target.value })} placeholder="Search for a movie..." autoFocus />
              <button>Search</button>
            </form>
          ) : (
            <></>
          )}
          <div className="my-14">
            <h1 className="text-3xl font-bold text-center mb-6">Favorites Movies</h1>
            <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
              {is_loadingFav && <CardSkeleton cards={favoriteSum} />}
              {favorites &&
                favorites.map((item: any, index: number) => {
                  return <Cards key={index} image={item.poster_path} title={item.title} release={item.release_date} detail={() => this.handlePopup(item.id)} remove={() => this.removeFavoriteMovie(item.id)} />;
                })}
            </div>
          </div>
          <div className="flex justify-center my-8">
            <Pagination prev={() => this.prevFavHandle()} next={() => this.nextFavHandle()} numPage={favPage} totalPages={totalFavPage} />
          </div>
          {visibility ? (
            movieDetail.id == id_movie ? (
              <Modal id_props={movieDetail.id} image={movieDetail.poster_path} title={movieDetail.title} release={movieDetail.release_date} desc={movieDetail.overview} showModal={() => this.handlePopup()} />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </Layout>
      </div>
    );
  }
}

export default withRouter(Favorite);
