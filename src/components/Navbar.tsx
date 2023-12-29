import React, { Component } from "react";

interface NavbarProps {
  search: () => void;
}

export class Navbar extends Component<NavbarProps> {
  render() {
    const { search } = this.props;
    return (
      <div>
        <div className="flex justify-around items-center h-16 w-full font-main text-white bg-slate-500">
          <h1 className="text-2xl font-bold font-logo">
            <i className="bx bxs-camera-movie"></i> MOOPI
          </h1>
          <div>
            <ul className="flex gap-12">
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Favorite
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Popular
                </a>
              </li>
              <li className="border-l border-solid border-l-slate-300"></li>
              <li>
                <button onClick={search}>
                  <i className="bx bx-search hover:text-yellow-300"></i>
                </button>
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
  }
}

export default Navbar;
