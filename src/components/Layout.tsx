import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children?: React.ReactNode;
  showSearch: () => void;
}

export class Layout extends Component<LayoutProps> {
  render() {
    const { children, showSearch } = this.props;

    return (
      <>
        <header>
          <Navbar search={showSearch} />
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
