import React, { Component, FormEvent } from "react";
import { withRouter } from "../../withRouter";
import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination";

interface SearchProps {
  location: any;
  navigate: any;
}

type Movie = {
  id?: number;
  poster_path?: string;
  title?: string;
  release_date?: string;
  overview?: string;
};

interface SearchState {
  visibility?: boolean;
  showSearch?: boolean;
  id_movie?: number;
  movieDetail?: Movie;
  is_loadingSearch?: boolean;
  searchSum?: number;
  totalSearchPage?: number;
  searchPage?: number;
  datasSearch?: never[];
  keywordSearch?: string;
}

export class Search extends Component<SearchProps, SearchState> {
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
    is_loadingSearch: true,
    searchSum: 0,
    totalSearchPage: 0,
    searchPage: 1,
    datasSearch: [],
    keywordSearch: "",
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

  searchResults(movieName: string, page: number) {
    axios
      .get(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
        },
      })
      .then((response) => {
        this.setState({ is_loadingSearch: true });
        const searchResults = response.data.results;
        this.setState({ searchSum: searchResults.length });
        this.setState({ totalSearchPage: response.data.total_pages });
        if (page == 1) {
          this.setState({ searchPage: 1 });
        }
        if (searchResults.length != 0) {
          setTimeout(() => {
            this.setState({ datasSearch: searchResults });
            this.setState({ is_loadingSearch: false });
          }, 3000);
        } else if (movieName == "clear this search") {
          this.setState({ datasSearch: [] });
          this.setState({ datasSearch: [0] });
          this.setState({ searchPage: 1 });
        } else if (searchResults.length == 0) {
          this.setState({ datasSearch: [] });
        }
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
    window.location.reload();
  };

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
    const { location } = this.props;
    const { searchPage } = this.state;
    const keyword = location.state.keywordSearch;
    this.searchResults(keyword, searchPage);
  }

  nextSearchHandle() {
    const { location } = this.props;
    const { searchPage } = this.state;
    const keyword = location.state.keywordSearch;
    this.setState({ searchPage: searchPage + 1 });
    this.setState({ is_loadingSearch: true });
    this.setState({ datasSearch: [] });
    setTimeout(() => {
      this.searchResults(keyword, searchPage + 1);
    }, 500);
  }

  prevSearchHandle() {
    const { location } = this.props;
    const { searchPage } = this.state;
    const keyword = location.state.keywordSearch;
    this.setState({ searchPage: searchPage - 1 });
    this.setState({ is_loadingSearch: true });
    this.setState({ datasSearch: [] });
    setTimeout(() => {
      this.searchResults(keyword, searchPage - 1);
    }, 500);
  }

  render() {
    const { is_loadingSearch, searchSum, totalSearchPage, searchPage, datasSearch, showSearch, visibility, movieDetail, id_movie, keywordSearch } = this.state;
    const { location } = this.props;
    const keyword = location.state.keywordSearch;
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
          {(() => {
            if (searchSum) {
              return (
                <>
                  <div className="my-14">
                    <h1 className="text-3xl font-bold text-center mb-6">Search Results "{keyword}"</h1>
                    <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
                      {is_loadingSearch && <CardSkeleton cards={searchSum} />}
                      {!is_loadingSearch &&
                        datasSearch.map((item: any, index: number) => {
                          return <Cards key={index} image={item.poster_path} title={item.title} release={item.release_date} detail={() => this.handlePopup(item.id)} favorite={() => this.addToFavoriteMovie(item.id)} />;
                        })}
                    </div>
                  </div>
                  <div className="flex justify-center my-8">
                    <Pagination prev={() => this.prevSearchHandle()} next={() => this.nextSearchHandle()} numPage={searchPage} totalPages={totalSearchPage} />
                  </div>
                </>
              );
            } else if (datasSearch.length == 0) {
              return (
                <>
                  <div className="my-14">
                    <h1 className="text-3xl font-bold text-center mb-6">Search Results</h1>
                    <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
                      <h1>No Movie Found...</h1>
                    </div>
                    <div className="w-3/4 mx-auto p-3 mt-5">
                      <button onClick={() => this.searchResults("clear this search", 1)} className="bg-slate-500 text-white rounded-md p-3">
                        Clear
                      </button>
                    </div>
                  </div>
                </>
              );
            } else if (datasSearch[0] == 0) {
              return <></>;
            }
          })()}
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

export default withRouter(Search);
