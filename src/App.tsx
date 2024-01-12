import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/home";
import Favorite from "./pages/favorite";
import Detail from "./pages/detail";
import Search from "./pages/search";
import Popular from "./pages/popular";

const App = () => {
  axios.defaults.baseURL = "https://api.themoviedb.org/3/";

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Favorite />} path="/favorite" />
        <Route element={<Detail />} path="/detail" />
        <Route element={<Search />} path="/search" />
        <Route element={<Popular />} path="/popular" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
