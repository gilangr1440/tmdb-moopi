import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Favorite from "./pages/favorite";
import Detail from "./pages/detail";
import Search from "./pages/search";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Favorite />} path="/favorite" />
          <Route element={<Detail />} path="/detail" />
          <Route element={<Search />} path="/search" />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

// import React, { Component } from "react";
// import Cards from "./components/Cards";
// import Layout from "./components/Layout";
// import Modal from "./components/Modal";
// import Pagination from "./components/Pagination";

// // import data from "./dummy/movie.json";
// import Swipper from "./components/Swipper";
// import axios from "axios";
// import CardSkeleton from "./components/CardSkeleton";
// import Swal from "sweetalert2";
// import GenreButton from "./components/GenreButton";

// type Movie = {
//   id?: number;
//   poster_path?: string;
//   title?: string;
//   release_date?: string;
//   overview?: string;
// };

// interface AppState {
//   visibility: boolean;
//   showSearch: boolean;
//   id_movie: number;
//   datas: [];
//   movieDetail: Movie;
//   datasSum: number;
//   favorites: [];
//   favoriteSum: number;
//   datasSearch: [];
//   searchSum: number;
//   genres: [];
//   genreId: number;
//   movieByGenre: [];
//   movieByGenreLength: number;
//   keywordSearch: string;
//   page: number;
//   favPage: number;
//   searchPage: number;
//   genrePage: number;
//   totalFavPage: number;
//   totalPages: number;
//   totalSearchPage: number;
//   totalGenrePage: number;
//   is_loading: boolean;
//   is_loadingFav: boolean;
//   is_loadingSearch: boolean;
//   is_loadingGenre: boolean;
// }

// class App extends Component<AppState> {
//   state = {
//     visibility: false,
//     showSearch: false,
//     id_movie: 0,
//     datas: [],
//     movieDetail: {
//       id: 0,
//       poster_path: "",
//       title: "",
//       release_date: "",
//       overview: "",
//     },
//     datasSum: 0,
//     favorites: [],
//     favoriteSum: 0,
//     datasSearch: [0],
//     genres: [],
//     genreId: 0,
//     movieByGenre: [],
//     movieByGenreLength: 0,
//     searchSum: 0,
//     keywordSearch: "",
//     page: 1,
//     favPage: 1,
//     searchPage: 1,
//     genrePage: 1,
//     totalFavPage: 0,
//     totalPages: 0,
//     totalSearchPage: 0,
//     totalGenrePage: 0,
//     is_loading: true,
//     is_loadingFav: true,
//     is_loadingSearch: true,
//     is_loadingGenre: true,
//   };

//   handlePopup(id?: number) {
//     const { visibility } = this.state;
//     this.setState({ id_movie: id });
//     this.setState({ visibility: !visibility });
//     axios
//       .get(`https://api.themoviedb.org/3/movie/${id}`, {
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
//         },
//       })
//       .then((response) => {
//         const detailResult = response.data;
//         console.log(detailResult);
//         this.setState({ movieDetail: detailResult });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   showSearchHandle() {
//     const { showSearch } = this.state;
//     this.setState({ showSearch: !showSearch });
//     console.log(showSearch);
//   }

//   getNowPlayingMovies(page: number) {
//     axios
//       .get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, {
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
//         },
//       })
//       .then((response) => {
//         const dataResults = response.data.results;
//         console.log(dataResults);
//         this.setState({ datasSum: dataResults.length });
//         this.setState({ totalPages: response.data.total_pages });
//         setTimeout(() => {
//           this.setState({ datas: dataResults });
//           this.setState({ is_loading: false });
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   getFavoritesMovies(page: number) {
//     axios
//       .get(`https://api.themoviedb.org/3/account/16826831/favorite/movies?language=en-US&page=${page}`, {
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
//         },
//       })
//       .then((response) => {
//         const dataFavoriteResults = response.data.results;
//         this.setState({ favoriteSum: dataFavoriteResults.length });
//         this.setState({ totalFavPage: response.data.total_pages });
//         // console.log(this.state.totalFavPage);
//         setTimeout(() => {
//           this.setState({ favorites: dataFavoriteResults });
//           this.setState({ is_loadingFav: false });
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   searchMovies(movieName: string, searchPage: number) {
//     axios
//       .get(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${searchPage}`, {
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
//         },
//       })
//       .then((response) => {
//         this.setState({ is_loadingSearch: true });
//         const searchResults = response.data.results;
//         this.setState({ searchSum: searchResults.length });
//         this.setState({ totalSearchPage: response.data.total_pages });
//         if (searchPage == 1) {
//           this.setState({ searchPage: 1 });
//         }
//         if (searchResults.length != 0) {
//           setTimeout(() => {
//             this.setState({ datasSearch: searchResults });
//             this.setState({ is_loadingSearch: false });
//           }, 3000);
//         } else if (movieName == "clear this search") {
//           this.setState({ datasSearch: [] });
//           this.setState({ datasSearch: [0] });
//           this.setState({ searchPage: 1 });
//         } else if (searchResults.length == 0) {
//           this.setState({ datasSearch: [] });
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   getGenres() {
//     axios
//       .get(`https://api.themoviedb.org/3/genre/movie/list`, {
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
//         },
//       })
//       .then((response) => {
//         const genresResult = response.data.genres;
//         this.setState({ genres: genresResult });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   getMovieByGenre(genre: number, page: number) {
//     axios
//       .get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${page}&with_genres=${genre}`, {
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
//         },
//       })
//       .then((response) => {
//         this.setState({ is_loadingGenre: true });
//         const movieByGenreResults = response.data.results;
//         this.setState({ movieByGenreLength: movieByGenreResults.length });
//         this.setState({ totalGenrePage: response.data.total_pages });
//         this.setState({ genreId: genre });
//         if (page === 1) {
//           this.setState({ genrePage: 1 });
//         }
//         if (genre == 0) {
//           this.setState({ movieByGenre: [] });
//         } else {
//           setTimeout(() => {
//             this.setState({ movieByGenre: movieByGenreResults });
//             this.setState({ is_loadingGenre: false });
//           }, 3000);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   addToFavoriteMovie(id_movie: number) {
//     axios
//       .post(
//         `https://api.themoviedb.org/3/account/16826831/favorite`,
//         {
//           media_type: "movie",
//           media_id: id_movie,
//           favorite: true,
//         },
//         {
//           headers: {
//             accept: "application/json",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response);
//         this.setState({ favorites: [] });
//         this.setState({ is_loadingFav: true });
//         setTimeout(() => {
//           this.getFavoritesMovies(this.state.favPage);
//         }, 500);
//         Swal.fire({
//           title: "Added",
//           text: "Success add favorite movie",
//           icon: "success",
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   removeFavoriteMovie(id_movie: number) {
//     axios
//       .post(
//         `https://api.themoviedb.org/3/account/16826831/favorite`,
//         {
//           media_type: "movie",
//           media_id: id_movie,
//           favorite: false,
//         },
//         {
//           headers: {
//             accept: "application/json",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzhhZDNhZTJkNzg0NDQ2ZWEzYWFiZjM3ZjZiNWU1OCIsInN1YiI6IjYzYjRlM2YxMzhlNTEwMDA4YTk5MWQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30dKYemkNPXLr1hEqEgmh6zjfr7yl2NllOSUNKZGpXo",
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response);
//         this.setState({ favorites: [] });
//         this.setState({ is_loadingFav: true });
//         setTimeout(() => {
//           this.getFavoritesMovies(this.state.favPage);
//         }, 500);
//         Swal.fire({
//           title: "Removed",
//           text: "Success remove favorite movie",
//           icon: "warning",
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   componentDidMount(): void {
//     this.getNowPlayingMovies(this.state.page);
//     this.getFavoritesMovies(this.state.favPage);
//     this.getGenres();
//   }

//   nextPageHandle() {
//     const { page } = this.state;
//     this.setState({ page: page + 1 });
//     this.setState({ is_loading: true });
//     this.setState({ datas: [] });
//     setTimeout(() => {
//       this.getNowPlayingMovies(this.state.page);
//     }, 500);
//   }

//   prevPageHandle() {
//     const { page } = this.state;
//     this.setState({ page: page - 1 });
//     if (page === 0) {
//       alert("Out of bound");
//       this.setState({ page: 1 });
//     }
//     this.setState({ is_loading: true });
//     this.setState({ datas: [] });
//     setTimeout(() => {
//       this.getNowPlayingMovies(this.state.page);
//     }, 500);
//   }

//   nextFavHandle() {
//     const { favPage } = this.state;
//     this.setState({ favPage: favPage + 1 });
//     this.setState({ is_loadingFav: true });
//     this.setState({ favorites: [] });
//     setTimeout(() => {
//       this.getFavoritesMovies(this.state.favPage);
//     }, 500);
//   }

//   prevFavHandle() {
//     const { favPage } = this.state;
//     this.setState({ favPage: favPage - 1 });
//     if (favPage === 0) {
//       alert("Out of bound");
//       this.setState({ favPage: 1 });
//     }
//     this.setState({ is_loadingFav: true });
//     this.setState({ favorites: [] });
//     setTimeout(() => {
//       this.getFavoritesMovies(this.state.favPage);
//     }, 500);
//   }

//   nextSearchHandle() {
//     const { searchPage, keywordSearch } = this.state;
//     this.setState({ searchPage: searchPage + 1 });
//     this.setState({ is_loadingSearch: true });
//     this.setState({ datasSearch: [] });
//     setTimeout(() => {
//       this.searchMovies(keywordSearch, searchPage + 1);
//     }, 500);
//   }

//   prevSearchHandle() {
//     const { searchPage, keywordSearch } = this.state;
//     this.setState({ searchPage: searchPage - 1 });
//     this.setState({ is_loadingSearch: true });
//     this.setState({ datasSearch: [] });
//     setTimeout(() => {
//       this.searchMovies(keywordSearch, searchPage - 1);
//     }, 500);
//   }

//   nextGenreHandle() {
//     const { genrePage, genreId } = this.state;
//     this.setState({ genrePage: genrePage + 1 });
//     this.setState({ is_loadingGenre: true });
//     this.setState({ movieByGenre: [] });
//     setTimeout(() => {
//       this.getMovieByGenre(genreId, genrePage + 1);
//     }, 500);
//   }

//   prevGenreHandle() {
//     const { genrePage, genreId } = this.state;
//     this.setState({ genrePage: genrePage - 1 });
//     this.setState({ is_loadingGenre: true });
//     this.setState({ movieByGenre: [] });
//     setTimeout(() => {
//       this.getMovieByGenre(genreId, genrePage - 1);
//     }, 500);
//   }

//   render() {
//     const {
//       visibility,
//       showSearch,
//       id_movie,
//       datas,
//       movieDetail,
//       favorites,
//       favoriteSum,
//       datasSum,
//       searchSum,
//       datasSearch,
//       keywordSearch,
//       genres,
//       movieByGenre,
//       movieByGenreLength,
//       page,
//       favPage,
//       searchPage,
//       genrePage,
//       is_loading,
//       is_loadingFav,
//       is_loadingSearch,
//       is_loadingGenre,
//       totalPages,
//       totalFavPage,
//       totalSearchPage,
//       totalGenrePage,
//     } = this.state;
//     return (
//       <div>
//         <Layout showSearch={() => this.showSearchHandle()}>
//           {showSearch ? (
//             <form action="#" className="w-full absolute z-10 gap-5 flex justify-center items-center bg-white h-10">
//               <i className="bx bx-search text-lg"></i>
//               <input type="text" value={keywordSearch} className="w-4/5 h-[33px] outline-none" onChange={(e: any) => this.setState({ keywordSearch: e.target.value })} placeholder="Search for a movie..." autoFocus />
//               <button onClick={() => this.searchMovies(keywordSearch, 1)}>Search</button>
//             </form>
//           ) : (
//             <></>
//           )}
//           <div className="h-80">
//             <Swipper />
//           </div>

//           {(() => {
//             if (searchSum) {
//               return (
//                 <>
//                   <div className="my-14">
//                     <h1 className="text-3xl font-bold text-center mb-6">Search Results</h1>
//                     <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
//                       {is_loadingSearch && <CardSkeleton cards={searchSum} />}
//                       {!is_loadingSearch &&
//                         datasSearch.map((item: any, index: number) => {
//                           return <Cards key={index} image={item.poster_path} title={item.title} release={item.release_date} detail={() => this.handlePopup(item.id)} favorite={() => this.addToFavoriteMovie(item.id)} />;
//                         })}
//                     </div>
//                     <div className="w-3/4 mx-auto p-3 mt-5">
//                       <button onClick={() => this.searchMovies("clear this search", 1)} className="bg-slate-500 text-white rounded-md p-3">
//                         Clear
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex justify-center my-8">
//                     <Pagination prev={() => this.prevSearchHandle()} next={() => this.nextSearchHandle()} numPage={searchPage} totalPages={totalSearchPage} />
//                   </div>
//                 </>
//               );
//             } else if (datasSearch.length == 0) {
//               return (
//                 <>
//                   <div className="my-14">
//                     <h1 className="text-3xl font-bold text-center mb-6">Search Results</h1>
//                     <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
//                       <h1>No Movie Found...</h1>
//                     </div>
//                     <div className="w-3/4 mx-auto p-3 mt-5">
//                       <button onClick={() => this.searchMovies("clear this search", 1)} className="bg-slate-500 text-white rounded-md p-3">
//                         Clear
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               );
//             } else if (datasSearch[0] == 0) {
//               return <></>;
//             }
//           })()}

//           <div className="my-14">
//             <h1 className="text-3xl font-bold text-center mb-6">Now Playing Movies</h1>

//             <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
//               {is_loading && <CardSkeleton cards={datasSum} />}
//               {/* <CardSkeleton cards={datas.length} /> */}
//               {datas &&
//                 datas.map((item: any, index: number) => {
//                   return <Cards key={index} image={item.poster_path} title={item.title} release={item.release_date} detail={() => this.handlePopup(item.id)} favorite={() => this.addToFavoriteMovie(item.id)} />;
//                 })}
//             </div>
//           </div>
//           <div className="flex justify-center my-8">
//             <Pagination prev={() => this.prevPageHandle()} next={() => this.nextPageHandle()} numPage={page} totalPages={totalPages} />
//           </div>

//           <div className="my-14 ">
//             <h1 className="text-3xl font-bold text-center mb-6">Genres</h1>
//             <div className="w-3/4 mx-auto flex flex-wrap justify-center gap-3">
//               {genres.map((item: any, index: number) => {
//                 return <GenreButton key={index} label={item.name} onclick={() => this.getMovieByGenre(item.id, 1)} />;
//               })}
//             </div>
//             <div className="w-3/4 mx-auto grid grid-cols-5 gap-4 my-8">
//               {is_loadingGenre && <CardSkeleton cards={movieByGenreLength} />}
//               {movieByGenre &&
//                 movieByGenre.map((item: any, index: number) => {
//                   return <Cards key={index} image={item.poster_path} title={item.title} release={item.release_date} detail={() => this.handlePopup(item.id)} favorite={() => this.addToFavoriteMovie(item.id)} />;
//                 })}
//             </div>
//             {movieByGenreLength != 0 && (
//               <>
//                 <div className="flex justify-center my-8">
//                   <Pagination prev={() => this.prevGenreHandle()} next={() => this.nextGenreHandle()} numPage={genrePage} totalPages={totalGenrePage} />
//                 </div>
//                 <div className="w-3/4 mx-auto p-3 mt-5">
//                   <button onClick={() => this.getMovieByGenre(0, 1)} className="bg-slate-500 text-white rounded-md p-3">
//                     Clear
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="my-14">
//             <h1 className="text-3xl font-bold text-center mb-6">Favorites Movies</h1>
//             <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
//               {is_loadingFav && <CardSkeleton cards={favoriteSum} />}
//               {favorites &&
//                 favorites.map((item: any, index: number) => {
//                   return <Cards key={index} image={item.poster_path} title={item.title} release={item.release_date} detail={() => this.handlePopup(item.id)} remove={() => this.removeFavoriteMovie(item.id)} />;
//                 })}
//             </div>
//           </div>
//           <div className="flex justify-center my-8">
//             <Pagination prev={() => this.prevFavHandle()} next={() => this.nextFavHandle()} numPage={favPage} totalPages={totalFavPage} />
//           </div>
//           {visibility ? (
//             movieDetail.id == id_movie ? (
//               <Modal id_props={movieDetail.id} image={movieDetail.poster_path} title={movieDetail.title} release={movieDetail.release_date} desc={movieDetail.overview} showModal={() => this.handlePopup()} />
//             ) : (
//               <></>
//             )
//           ) : (
//             <></>
//           )}
//         </Layout>
//       </div>
//     );
//   }
// }

// export default App;
