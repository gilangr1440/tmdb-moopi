import React, { FC } from "react";
import { CardProps } from "../utils/component";
import { Link } from "react-router-dom";

const Cards: FC<CardProps> = ({ id, image, title, release, detail, favorite, remove }) => {
  return (
    <div className="justify-self-center">
      <div className={`w-44 h-96 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md`}>
        <div className="h-3/4 mb-3 overflow-hidden rounded-lg">
          <img src={`https://image.tmdb.org/t/p/original/${image}`} className="w-full h-full mb-3 object-cover" alt="" />
        </div>
        <div className="px-2">
          <Link to="/detail" state={{ id: `${id}` }} className="hover:text-yellow-300 text-slate-950 dark:text-white">
            <p className="truncate">{title}</p>
          </Link>
          <p className={`mb-2 text-slate-950 dark:text-white`}>{release}</p>
          <div className="flex gap-3">
            <button className={`bg-slate-500 rounded-md text-white w-full h-6`} onClick={detail}>
              Detail
            </button>
            {favorite ? (
              <button className={`  bg-slate-500 rounded-md text-white w-full h-6`} onClick={favorite}>
                Favorite
              </button>
            ) : (
              <button className={`  bg-slate-500 rounded-md text-white w-full h-6`} onClick={remove}>
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
