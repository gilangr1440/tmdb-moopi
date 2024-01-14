import { FC, FormEvent, useEffect, useState } from "react";
import { withRouter } from "../../withRouter";
import Layout from "../../components/Layout";
import axios from "axios";
import { DetailProps } from "../../utils/pages";
import Swal from "sweetalert2";

interface GenresType {
  id: number;
  name: string;
}

interface CompaniesType {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface CastsType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

type Movie = {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: {
    id?: number;
    name?: string;
    poster_path?: string;
    backdrop_path?: string;
  };
  budget?: number;
  credits?: {
    cast?: CastsType[] | never[];
    crew?: never[];
  };
  genres?: GenresType[] | never[];
  homepage?: string;
  id?: number | any;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: CompaniesType[] | never[];
  production_countries?: never[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: never[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

const Detail: FC<DetailProps> = ({ location, navigate }) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  // const [movieDetail, setMovieDetail] = useState<Movie>({});
  const [movieDetail, setMovieDetail] = useState<Movie>({
    adult: false,
    backdrop_path: "",
    belongs_to_collection: {
      id: 0,
      name: "",
      poster_path: "",
      backdrop_path: "",
    },
    budget: 0,
    credits: {
      cast: [],
      crew: [],
    },
    genres: [],
    homepage: "",
    id: 0,
    imdb_id: "",
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    production_companies: [],
    production_countries: [],
    release_date: "",
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: "",
    tagline: "",
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0,
  });
  const [genres, setGenres] = useState<GenresType[]>([
    {
      id: 0,
      name: "",
    },
  ]);
  const [companies, setCompanies] = useState<CompaniesType[]>([
    {
      id: 0,
      logo_path: "",
      name: "",
      origin_country: "",
    },
  ]);
  const [casts, setCasts] = useState<CastsType[]>([
    {
      adult: false,
      gender: 0,
      id: 0,
      known_for_department: "",
      name: "",
      original_name: "",
      popularity: 0,
      profile_path: "",
      cast_id: 0,
      character: "",
      credit_id: "",
      order: 0,
    },
  ]);
  const [keywordSearch, setKeywordSearch] = useState<string>("");
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const userId = import.meta.env.VITE_USER_ID;

  function showSearchHandle() {
    setShowSearch(!showSearch);
  }

  const searchMovies = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/search", {
      state: {
        keywordSearch: keywordSearch,
      },
    });
  };

  function getMovieDetail(id: number) {
    axios
      .get(`movie/${id}?append_to_response=credits`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const detailResult = response.data;
        setMovieDetail(detailResult);
        setGenres(response.data.genres);
        setCompanies(response.data.production_companies);
        setCasts(response.data.credits.cast);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addToFavoriteMovie(id: number) {
    axios
      .post(
        `account/${userId}/favorite`,
        {
          media_type: "movie",
          media_id: id,
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
    const id = location.state.id;
    getMovieDetail(id);
  }, []);

  const TabTitle = (newTitle: any) => {
    return (document.title = newTitle);
  };

  TabTitle(`Moopi | ${movieDetail.title}`);

  return (
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

      <div className="w-full">
        <div className="w-full h-[160vh] relative">
          <img src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`} className="object-cover w-full h-full backdrop-img" />
          <div className="w-full h-[160vh] p-9 bg-gradient-to-r from-yellow-300 to-slate-500 opacity-60 absolute top-0"></div>
          <div className="w-4/5 absolute top-8 left-1/2 translate-x-[-50%] p-3 flex justify-between">
            <div className="w-72 overflow-hidden rounded-lg">
              <img src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`} className="w-full h-full object-cover" />
            </div>
            <div className="w-[70%] backdrop-blur-md p-3 rounded-lg">
              <h1 className="text-white text-4xl font-bold font-main">{movieDetail.title}</h1>
              <ul className="flex gap-2 text-white font-main mb-5">
                {genres.map((items: any, index: number) => {
                  return <li key={index}>{items.name}</li>;
                })}
              </ul>
              <div className="flex gap-3 items-center">
                <h1 className="text-white font-main">Production company:</h1>
                <ul className="flex gap-2 text-white font-main">
                  {companies.slice(0, 3).map((items: any, index: number) => {
                    return <li key={index}>{items.name}</li>;
                  })}
                </ul>
              </div>
              <div className="flex gap-3 items-center">
                <h1 className="text-white font-main">Release:</h1>
                <p className="text-white font-main">{movieDetail.release_date}</p>
              </div>
              <div className="flex gap-3 items-center">
                <h1 className="text-white font-main">Language:</h1>
                <p className="text-white font-main">{movieDetail.original_language}</p>
              </div>
              <div className="flex gap-3 items-center">
                <h1 className="text-white font-main">Status:</h1>
                <p className="text-white font-main">{movieDetail.status}</p>
              </div>
              <div className="flex gap-3 items-center">
                <h1 className="text-white font-main">Casts:</h1>
                <ul className="flex gap-2 text-white font-main">
                  {casts.slice(0, 5).map((items: any, index: number) => {
                    return <li key={index}>{items.name}</li>;
                  })}
                </ul>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <h1 className="text-white font-main">Vote average:</h1>
                <p className="text-white font-main">{movieDetail.vote_average}</p>
              </div>
              <h1 className="text-white text-xl font-main">Overview</h1>
              <p className="text-white font-main">{movieDetail.overview}</p>

              <button className="mt-4 mx-3 h-8 float-end bg-slate-500 hover:bg-yellow-500 text-white text-center font-bold p-2 rounded" onClick={() => addToFavoriteMovie(movieDetail.id)}>
                Favorite
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Detail);
