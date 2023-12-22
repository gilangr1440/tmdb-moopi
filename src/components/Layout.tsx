import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children?: React.ReactNode;
}

export class Layout extends Component<LayoutProps> {
  render() {
    const { children } = this.props;

    return (
      <>
        <header>
          <Navbar />
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
