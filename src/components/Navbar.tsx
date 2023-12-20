import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="flex justify-around items-center h-16 w-full font-main text-white bg-slate-500">
          <h1 className="text-2xl font-bold">
            <i className="bx bxs-camera-movie"></i> MOOPI
          </h1>
          <div>
            <ul className="flex gap-12">
              <li>Home</li>
              <li>Favorite</li>
              <li>Popular</li>
              <li className="border-l border-solid border-l-slate-300"></li>
              <li>
                <i className="bx bx-search"></i>
              </li>
            </ul>
          </div>
          <div className="flex gap-6 items-center">
            <i className="bx bxs-bell"></i>
            <img src="src/assets/avatar.jpg" className="rounded-full" width={40} alt="profile" />
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
