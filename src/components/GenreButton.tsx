import React, { Component } from "react";

interface ButtonProps {
  onclick?: () => void;
  label: string;
}

export class GenreButton extends Component<ButtonProps> {
  render() {
    const { onclick, label } = this.props;
    return (
      <div>
        <button onClick={onclick} className="bg-slate-500 hover:bg-slate-600 rounded-full text-white p-2">
          {label}
        </button>
      </div>
    );
  }
}

export default GenreButton;
