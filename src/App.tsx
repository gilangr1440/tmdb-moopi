import { Component } from "react";
import Cards from "./components/Cards";
import Layout from "./components/Layout";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";

// import data from "./dummy/movie.json";
import Swipper from "./components/Swipper";
import axios from "axios";
import CardSkeleton from "./components/CardSkeleton";
import Swal from "sweetalert2";

interface AppState {
  visibility: boolean;
  id_movie: string;
  datas: [];
  datasSum: number;
  favorites: [];
  favoriteSum: number;
  page: number;
  favPage: number;
  totalFavPage: number;
  totalPages: number;
  is_loading: boolean;
  is_loadingFav: boolean;
}

class App extends Component<AppState> {
  state = {
    visibility: false,
    id_movie: "",
    datas: [],
    datasSum: 0,
    favorites: [],
    favoriteSum: 0,
    page: 1,
    favPage: 1,
    totalFavPage: 0,
    totalPages: 0,
    is_loading: true,
    is_loadingFav: true,
  };

  handlePopup(id?: string) {
    const { visibility } = this.state;
    this.setState({ id_movie: id });
    this.setState({ visibility: !visibility });
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
        this.setState({ favorites: [] });
        this.setState({ is_loadingFav: true });
        setTimeout(() => {
          this.getFavoritesMovies(this.state.favPage);
        }, 500);
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
    this.getNowPlayingMovies(this.state.page);
    this.getFavoritesMovies(this.state.favPage);
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
      this.setState({ page: 1 });
    }
    this.setState({ is_loadingFav: true });
    this.setState({ favorites: [] });
    setTimeout(() => {
      this.getFavoritesMovies(this.state.favPage);
    }, 500);
  }

  render() {
    const { visibility, id_movie, datas, favorites, favoriteSum, datasSum, page, favPage, is_loading, is_loadingFav, totalPages, totalFavPage } = this.state;
    return (
      <div>
        <Layout>
          <div className="h-72">
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
          <div className="flex justify-center my-8">
            <Pagination prev={() => this.prevPageHandle()} next={() => this.nextPageHandle()} numPage={page} totalPages={totalPages} />
          </div>

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
        </Layout>
      </div>
    );
  }
}

export default App;
