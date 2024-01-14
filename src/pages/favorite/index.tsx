import { FC, FormEvent, useEffect, useState } from "react";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";

import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton";
import Swal from "sweetalert2";
import { withRouter } from "../../withRouter";
import { FavProps, Movie } from "../../utils/pages";
import { TabTitle } from "../../utils/functiontitle";

const Favorite: FC<FavProps> = ({ navigate }) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [idMovie, setIdMovie] = useState<number>(0);
  const [movieDetail, setMovieDetail] = useState<Movie>({
    id: 0,
    poster_path: "",
    title: "",
    release_date: "",
    overview: "",
  });
  const [favorites, setFavorites] = useState<never[]>([]);
  const [favoriteSum, setFavoriteSum] = useState<number>(0);
  const [keywordSearch, setKeywordSearch] = useState<string>("");
  const [favPage, setFavPage] = useState<number>(1);
  const [totalFavPage, setTotalFavPage] = useState<number>(0);
  const [isLoadingFav, setIsLoadingFav] = useState<boolean>(true);
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

  function getFavoritesMovies(page: number) {
    axios
      .get(`account/${userId}/favorite/movies?language=en-US&page=${page}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoadingFav(true);
        setFavorites([]);
        const { results, total_pages } = response.data;
        setFavoriteSum(results.length);
        setTotalFavPage(total_pages);
        setTimeout(() => {
          setFavorites(results);
          setIsLoadingFav(false);
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

  function removeFavoriteMovie(id_movie: number) {
    axios
      .post(
        `account/${userId}/favorite`,
        {
          media_type: "movie",
          media_id: id_movie,
          favorite: false,
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
        setFavorites([]);
        setIsLoadingFav(true);
        setTimeout(() => {
          getFavoritesMovies(favPage);
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

  useEffect(() => {
    getFavoritesMovies(favPage);
  }, [favPage]);

  function nextFavHandle() {
    setFavPage(favPage + 1);
  }

  function prevFavHandle() {
    setFavPage(favPage - 1);
  }

  TabTitle("Moopi | Favorite");

  return (
    <div className="dark:bg-slate-700">
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
        <div className="my-14">
          <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Favorites Movies</h1>
          <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
            {isLoadingFav && <CardSkeleton cards={favoriteSum} />}
            {favorites &&
              favorites.map((item: any, index: number) => {
                return <Cards key={index} id={item.id} image={item.poster_path} title={item.title} release={item.release_date} detail={() => handlePopup(item.id)} remove={() => removeFavoriteMovie(item.id)} />;
              })}
          </div>
        </div>
        <div className="flex justify-center my-8">
          <Pagination prev={() => prevFavHandle()} next={() => nextFavHandle()} numPage={favPage} totalPages={totalFavPage} />
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

export default withRouter(Favorite);
