import React, { Component } from "react";
import Navbar from "./Navbar";

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
        <footer></footer>
      </>
    );
  }
}

export default Layout;
