import { FC, FormEvent, useEffect, useState } from "react";
import { withRouter } from "../../withRouter";
import axios from "axios";
import CardSkeleton from "../../components/CardSkeleton";
import Cards from "../../components/Cards";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination";
import { Movie, SearchProps } from "../../utils/pages";
import { TabTitle } from "../../utils/functiontitle";

const Search: FC<SearchProps> = ({ location, navigate }) => {
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
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(true);
  const [searchSum, setSearchSum] = useState<number>(0);
  const [totalSearchPage, setTotalSearchPage] = useState<number>(0);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [datasSearch, setDatasSearch] = useState<never[]>([]);
  const [keywordSearch, setKeywordSearch] = useState<string>("");
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

  function searchResults(movieName: string, page: number) {
    axios
      .get(`search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoadingSearch(true);
        setDatasSearch([]);
        const { results, total_pages } = response.data;
        setSearchSum(results.length);
        setTotalSearchPage(total_pages);
        if (page == 1) {
          setSearchPage(1);
        }
        if (results.length != 0) {
          setTimeout(() => {
            setDatasSearch(results);
            setIsLoadingSearch(false);
          }, 3000);
        } else if (results.length == 0) {
          setDatasSearch([0]);
        }
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
    window.location.reload();
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
    const keyword = location.state.keywordSearch;
    searchResults(keyword, searchPage);
  }, [searchPage]);

  function nextSearchHandle() {
    setSearchPage(searchPage + 1);
  }

  function prevSearchHandle() {
    setSearchPage(searchPage - 1);
  }

  const keyword = location.state.keywordSearch;
  TabTitle(`Moopi | Search Result "${keyword}"`);

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
        {(() => {
          if (searchSum) {
            return (
              <>
                <div className="my-14">
                  <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Search Results "{keyword}"</h1>
                  <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
                    {isLoadingSearch && <CardSkeleton cards={searchSum} />}
                    {!isLoadingSearch &&
                      datasSearch.map((item: any, index: number) => {
                        return <Cards key={index} id={item.id} image={item.poster_path} title={item.title} release={item.release_date} detail={() => handlePopup(item.id)} favorite={() => addToFavoriteMovie(item.id)} />;
                      })}
                  </div>
                </div>
                <div className="flex justify-center my-8">
                  <Pagination prev={() => prevSearchHandle()} next={() => nextSearchHandle()} numPage={searchPage} totalPages={totalSearchPage} />
                </div>
              </>
            );
          } else if (datasSearch.length == 0) {
            return (
              <>
                <div className="my-14">
                  <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Search Results "{keyword}"</h1>
                  <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
                    <h1 className="dark:text-white">Loading...</h1>
                  </div>
                </div>
              </>
            );
          } else if (datasSearch[0] == 0) {
            return (
              <>
                <div className="my-14">
                  <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Search Results "{keyword}"</h1>
                  <div className="w-3/4 mx-auto grid grid-cols-5 gap-4">
                    <h1 className="dark:text-white">Movie Not Found</h1>
                  </div>
                </div>
              </>
            );
          }
        })()}
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

export default withRouter(Search);
