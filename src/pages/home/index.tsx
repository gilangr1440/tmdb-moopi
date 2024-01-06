import React, { FC, FormEvent, useEffect, useState } from "react";
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
import { HomeProps, Movie } from "../../utils/pages";

const Home: FC<HomeProps> = ({ navigate }) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [idMovie, setIdMovie] = useState<number>(0);
  const [datas, setDatas] = useState<never[]>([]);
  const [movieDetail, setMovieDetail] = useState<Movie>({
    id: 0,
    poster_path: "",
    title: "",
    release_date: "",
    overview: "",
  });
  const [datasSum, setDatasSum] = useState<number>(0);
  const [genres, setGenres] = useState<never[]>([]);
  const [genreId, setGenreId] = useState<number>(0);
  const [movieByGenre, setMovieByGenre] = useState<never[]>([]);
  const [movieByGenreLength, setMovieByGenreLength] = useState<number>(0);
  const [keywordSearch, setKeywordSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [genrePage, setGenrePage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalGenrePage, setTotalGenrePage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingGenre, setIsLoadingGenre] = useState<boolean>(true);
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const userId = import.meta.env.VITE_USER_ID;

  function handlePopup(id?: number) {
    setIdMovie(id);
    setVisibility(!visibility);
    axios
      .get(`movie/${id}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const detailResult = response.data;
        setMovieDetail(detailResult);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function showSearchHandle() {
    setShowSearch(!showSearch);
  }

  function getNowPlayingMovies(page: number) {
    axios
      .get(`movie/now_playing?language=en-US&page=${page}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoading(true);
        setDatas([]);
        const { results, total_pages } = response.data;
        setDatasSum(results.length);
        setTotalPages(total_pages);
        setTimeout(() => {
          setDatas(results);
          setIsLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const searchMovies = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/search", {
      state: {
        keywordSearch: keywordSearch,
      },
    });
  };

  function getGenres() {
    axios
      .get(`genre/movie/list`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const { genres } = response.data;
        console.log(genres);
        setGenres(genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getMovieByGenre(genre: number, page: number) {
    axios
      .get(`discover/movie?include_adult=false&language=en-US&page=${page}&with_genres=${genre}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoadingGenre(true);
        setMovieByGenre([]);
        const { results, total_pages } = response.data;
        setMovieByGenreLength(results.length);
        setTotalGenrePage(total_pages);
        setGenreId(genre);
        if (page === 1) {
          setGenrePage(1);
        }
        if (genre == 0) {
          setMovieByGenre([]);
        } else {
          setTimeout(() => {
            setMovieByGenre(results);
            setIsLoadingGenre(false);
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addToFavoriteMovie(id_movie: number) {
    axios
      .post(
        `account/${userId}/favorite`,
        {
          media_type: "movie",
          media_id: id_movie,
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
    getNowPlayingMovies(page);
    getMovieByGenre(genreId, genrePage + 1);
    getGenres();
  }, [page, genrePage, genreId]);

  function nextPageHandle() {
    setPage(page + 1);
  }

  function prevPageHandle() {
    setPage(page - 1);
  }

  function nextGenreHandle() {
    setGenrePage(genrePage + 1);
  }

  function prevGenreHandle() {
    setGenrePage(genrePage - 1);
  }

  return (
    <div>
      <Layout showSearch={() => showSearchHandle()} searchIcon={showSearch}>
        {showSearch ? (
          <form onSubmit={searchMovies} className="w-full absolute z-10 gap-5 flex justify-center items-center bg-white h-10">
            <i className="bx bx-search text-lg"></i>
            <input type="text" value={keywordSearch} className="w-4/5 h-[33px] outline-none" onChange={(e: any) => setKeywordSearch(e.target.value)} placeholder="Search for a movie..." autoFocus />
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
            {isLoading && <CardSkeleton cards={datasSum} />}
            {/* <CardSkeleton cards={datas.length} /> */}
            {datas &&
              datas.map((item: any, index: number) => {
                return <Cards key={index} image={item.poster_path} title={item.title} release={item.release_date} detail={() => handlePopup(item.id)} favorite={() => addToFavoriteMovie(item.id)} />;
              })}
          </div>
        </div>
        <div className="flex justify-center my-8">
          <Pagination prev={() => prevPageHandle()} next={() => nextPageHandle()} numPage={page} totalPages={totalPages} />
        </div>

        <div className="my-14 ">
          <h1 className="text-3xl font-bold text-center mb-6">Genres</h1>
          <div className="w-3/4 mx-auto flex flex-wrap justify-center gap-3">
            {genres.map((item: any, index: number) => {
              return <GenreButton key={index} label={item.name} onclick={() => getMovieByGenre(item.id, 1)} />;
            })}
          </div>
          {genres.map((item: any, index: number) => {
            if (item.id == genreId) {
              return (
                <h1 key={index} className="text-3xl font-bold text-center my-6">
                  {item.name}
                </h1>
              );
            }
          })}
          <div className="w-3/4 mx-auto grid grid-cols-5 gap-4 my-8">
            {isLoadingGenre && <CardSkeleton cards={movieByGenreLength} />}
            {movieByGenre &&
              movieByGenre.map((item: any, index: number) => {
                return <Cards key={index} image={item.poster_path} title={item.title} release={item.release_date} detail={() => handlePopup(item.id)} favorite={() => addToFavoriteMovie(item.id)} />;
              })}
          </div>
          {movieByGenreLength != 0 && (
            <>
              <div className="flex justify-center my-8">
                <Pagination prev={() => prevGenreHandle()} next={() => nextGenreHandle()} numPage={genrePage} totalPages={totalGenrePage} />
              </div>
              <div className="w-3/4 mx-auto p-3 mt-5">
                <button onClick={() => getMovieByGenre(0, 1)} className="bg-slate-500 text-white rounded-md p-3">
                  Clear
                </button>
              </div>
            </>
          )}
        </div>

        {visibility ? (
          movieDetail.id == idMovie ? (
            <Modal id_props={movieDetail.id} image={movieDetail.poster_path} title={movieDetail.title} release={movieDetail.release_date} desc={movieDetail.overview} showModal={() => handlePopup()} />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Layout>
    </div>
  );
};

export default withRouter(Home);
