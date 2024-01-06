import React, { FC } from "react";
import { Link } from "react-router-dom";
import { NavbarProps } from "../utils/component";

const Navbar: FC<NavbarProps> = ({ search, icon }) => {
  return (
    <div>
      <div className="flex justify-around items-center h-16 w-full font-main text-white bg-slate-500">
        <h1 className="text-2xl font-bold font-logo">
          <i className="bx bxs-camera-movie"></i> MOOPI
        </h1>
        <div>
          <ul className="flex gap-12">
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/favorite" className="hover:text-yellow-300">
                Favorite
              </Link>
            </li>
            <li>
              <Link to="/popular" className="hover:text-yellow-300">
                Popular
              </Link>
            </li>
            <li className="border-l border-solid border-l-slate-300"></li>
            <li>
              <button onClick={search}>{icon ? <i className="bx bx-x hover:text-yellow-300"></i> : <i className="bx bx-search hover:text-yellow-300"></i>}</button>
            </li>
          </ul>
        </div>
        <div className="flex gap-6 items-center">
          <i className="bx bxs-bell hover:text-yellow-300"></i>
          <img src="src/assets/avatar.jpg" className="rounded-full" width={40} alt="profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
