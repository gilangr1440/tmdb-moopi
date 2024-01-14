import { FC, FormEvent, useEffect, useState } from "react";
import { withRouter } from "../../withRouter";
import axios from "axios";
import Swal from "sweetalert2";
import Cards from "../../components/Cards";
import CardSkeleton from "../../components/CardSkeleton";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import { Movie, PopProps } from "../../utils/pages";
import { TabTitle } from "../../utils/functiontitle";

const Popular: FC<PopProps> = ({ navigate }) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [idMovie, setIdMovie] = useState<number | any>(0);
  const [movieDetail, setMovieDetail] = useState<Movie>({
    id: 0,
    poster_path: "",
    title: "",
    release_date: "",
    overview: "",
  });
  const [popular, setPopular] = useState<never[]>([]);
  const [popularSum, setPopularSum] = useState<number>(0);
  const [keywordSearch, setKeywordSearch] = useState<string>("");
  const [popPage, setPopPage] = useState<number>(1);
  const [totalPopPage, setTotalPopPage] = useState<number>(0);
  const [isLoadingPop, setIsLoadingPop] = useState<boolean>(true);
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

  function getPopularMovies(page: number) {
    axios
      .get(`movie/popular?language=en-US&page=${page}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoadingPop(true);
        setPopular([]);
        const { results, total_pages } = response.data;
        setPopularSum(results.length);
        setTotalPopPage(total_pages);
        setTimeout(() => {
          setPopular(results);
          setIsLoadingPop(false);
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
    getPopularMovies(popPage);
  }, [popPage]);

  function nextPopHandle() {
    setPopPage(popPage + 1);
  }

  function prevPopHandle() {
    setPopPage(popPage - 1);
  }

  TabTitle("Moopi | Popular");

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
          <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Popular Movies</h1>
          <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
            {isLoadingPop && <CardSkeleton cards={popularSum} />}
            {popular &&
              popular.map((item: any, index: number) => {
                return <Cards key={index} id={item.id} image={item.poster_path} title={item.title} release={item.release_date} detail={() => handlePopup(item.id)} favorite={() => addToFavoriteMovie(item.id)} />;
              })}
          </div>
        </div>
        <div className="flex justify-center my-8">
          <Pagination prev={() => prevPopHandle()} next={() => nextPopHandle()} numPage={popPage} totalPages={totalPopPage} />
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

export default withRouter(Popular);
