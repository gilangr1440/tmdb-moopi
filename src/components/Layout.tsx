import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children?: React.ReactNode;
  showSearch: () => void;
  searchIcon: boolean;
}

export class Layout extends Component<LayoutProps> {
  render() {
    const { children, showSearch, searchIcon } = this.props;

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
  }
}

export default Layout;
