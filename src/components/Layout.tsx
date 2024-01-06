// import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import React, { FC } from "react";
import { LayoutProps } from "../utils/component";

const Layout: FC<LayoutProps> = ({ children, showSearch, searchIcon }) => {
  return (
    <>
      <header>
        <Navbar search={showSearch} icon={searchIcon} />
      </header>
      {children}
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
