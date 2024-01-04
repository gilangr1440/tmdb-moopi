import React, { Component, FormEvent } from "react";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";

// import data from "./dummy/movie.json";
import Swipper from "../../components/Swipper";
import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton";
import Swal from "sweetalert2";
import GenreButton from "../../components/GenreButton";
import { withRouter } from "../../withRouter";

type Movie = {
  id?: number;
  poster_path?: string;
  title?: string;
  release_date?: string;
  overview?: string;
};

interface HomeState {
  visibility?: boolean;
  showSearch?: boolean;
  id_movie?: number;
  datas?: never[];
  movieDetail?: Movie;
  datasSum?: number;
  genres?: never[];
  genreId?: number;
  movieByGenre?: never[];
  movieByGenreLength?: number;
  keywordSearch?: string;
  page?: number;
  genrePage?: number;
  totalPages?: number;
  totalGenrePage?: number;
  is_loading?: boolean;
  is_loadingGenre?: boolean;
}

interface HomeProps {
  navigate: any;
}

export class Home extends Component<HomeProps, HomeState> {
  state = {
    visibility: false,
    showSearch: false,
    id_movie: 0,
    datas: [],
    movieDetail: {
      id: 0,
      poster_path: "",
      title: "",
      release_date: "",
      overview: "",
    },
    datasSum: 0,
    genres: [],
    genreId: 0,
    movieByGenre: [],
    movieByGenreLength: 0,
    keywordSearch: "",
    page: 1,
    genrePage: 1,
    totalPages: 0,
    totalGenrePage: 0,
    is_loading: true,
    is_loadingGenre: true,
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
        this.setState({ movieDetail: detailResult });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  showSearchHandle() {
    const { showSearch } = this.state;
    this.setState({ showSearch: !showSearch });
  }

  getNowPlayingMovies(page: number) {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
        },
      })
      .then((response) => {
        const dataResults = response.data.results;
        this.setState({ datasSum: dataResults.length });
        this.setState({ totalPages: response.data.total_pages });
        setTimeout(() => {
          this.setState({ datas: dataResults });
          this.setState({ is_loading: false });
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

  getGenres() {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
        },
      })
      .then((response) => {
        const genresResult = response.data.genres;
        this.setState({ genres: genresResult });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getMovieByGenre(genre: number, page: number) {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${page}&with_genres=${genre}`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
        },
      })
      .then((response) => {
        this.setState({ is_loadingGenre: true });
        const movieByGenreResults = response.data.results;
        this.setState({ movieByGenreLength: movieByGenreResults.length });
        this.setState({ totalGenrePage: response.data.total_pages });
        this.setState({ genreId: genre });
        if (page === 1) {
          this.setState({ genrePage: 1 });
        }
        if (genre == 0) {
          this.setState({ movieByGenre: [] });
        } else {
          setTimeout(() => {
            this.setState({ movieByGenre: movieByGenreResults });
            this.setState({ is_loadingGenre: false });
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToFavoriteMovie(id_movie: number) {
    axios
      .post(
        `https://api.themoviedb.org/3/account/16826831/favorite`,
        {
          media_type: "movie",
          media_id: id_movie,
          favorite: true,
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

  componentDidMount(): void {
    this.getNowPlayingMovies(this.state.page);
    this.getGenres();
  }

  nextPageHandle() {
    const { page } = this.state;
    this.setState({ page: page + 1 });
    this.setState({ is_loading: true });
    this.setState({ datas: [] });
    setTimeout(() => {
      this.getNowPlayingMovies(this.state.page);
    }, 500);
  }

  prevPageHandle() {
    const { page } = this.state;
    this.setState({ page: page - 1 });
    if (page === 0) {
      alert("Out of bound");
      this.setState({ page: 1 });
    }
    this.setState({ is_loading: true });
    this.setState({ datas: [] });
    setTimeout(() => {
      this.getNowPlayingMovies(this.state.page);
    }, 500);
  }

  nextGenreHandle() {
    const { genrePage, genreId } = this.state;
    this.setState({ genrePage: genrePage + 1 });
    this.setState({ is_loadingGenre: true });
    this.setState({ movieByGenre: [] });
    setTimeout(() => {
      this.getMovieByGenre(genreId, genrePage + 1);
    }, 500);
  }

  prevGenreHandle() {
    const { genrePage, genreId } = this.state;
    this.setState({ genrePage: genrePage - 1 });
    this.setState({ is_loadingGenre: true });
    this.setState({ movieByGenre: [] });
    setTimeout(() => {
      this.getMovieByGenre(genreId, genrePage - 1);
    }, 500);
  }
  render() {
    const { visibility, showSearch, id_movie, datas, movieDetail, datasSum, keywordSearch, genres, movieByGenre, movieByGenreLength, page, genrePage, is_loading, is_loadingGenre, totalPages, totalGenrePage } = this.state;
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
          <div className="h-80">
            <Swipper />
          </div>

          <div className="my-14">
            <h1 className="text-3xl font-bold text-center mb-6">Now Playing Movies</h1>

            <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
              {is_loading && <CardSkeleton cards={datasSum} />}
              {/* <CardSkeleton cards={datas.length} /> */}
              {datas &&
                datas.map((item: any, index: number) => {
                  return <Cards key={index} image={item.poster_path} title={item.title} release={item.release_date} detail={() => this.handlePopup(item.id)} favorite={() => this.addToFavoriteMovie(item.id)} />;
                })}
            </div>
          </div>
          <div className="flex justify-center my-8">
            <Pagination prev={() => this.prevPageHandle()} next={() => this.nextPageHandle()} numPage={page} totalPages={totalPages} />
          </div>

          <div className="my-14 ">
            <h1 className="text-3xl font-bold text-center mb-6">Genres</h1>
            <div className="w-3/4 mx-auto flex flex-wrap justify-center gap-3">
              {genres.map((item: any, index: number) => {
                return <GenreButton key={index} label={item.name} onclick={() => this.getMovieByGenre(item.id, 1)} />;
              })}
            </div>
            <div className="w-3/4 mx-auto grid grid-cols-5 gap-4 my-8">
              {is_loadingGenre && <CardSkeleton cards={movieByGenreLength} />}
              {movieByGenre &&
                movieByGenre.map((item: any, index: number) => {
                  return <Cards key={index} image={item.poster_path} title={item.title} release={item.release_date} detail={() => this.handlePopup(item.id)} favorite={() => this.addToFavoriteMovie(item.id)} />;
                })}
            </div>
            {movieByGenreLength != 0 && (
              <>
                <div className="flex justify-center my-8">
                  <Pagination prev={() => this.prevGenreHandle()} next={() => this.nextGenreHandle()} numPage={genrePage} totalPages={totalGenrePage} />
                </div>
                <div className="w-3/4 mx-auto p-3 mt-5">
                  <button onClick={() => this.getMovieByGenre(0, 1)} className="bg-slate-500 text-white rounded-md p-3">
                    Clear
                  </button>
                </div>
              </>
            )}
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

export default withRouter(Home);
