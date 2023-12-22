import React, { Component } from "react";

interface CardProps {
  image: string;
  title: string;
  release: string;
  detail: () => void;
}

export class Cards extends Component<CardProps> {
  render() {
    const { image, title, release, detail } = this.props;
    return (
      <div>
        <div className="w-44 h-96 rounded-lg shadow-md">
          <div className="h-3/4 mb-3 overflow-hidden rounded-lg">
            <img src={image} className="w-full h-full mb-3 object-cover" alt="" />
          </div>
          <div className="px-2">
            <h1 className="truncate">{title}</h1>
            <p className="mb-2">{release}</p>
            <div className="flex gap-3">
              <button className="bg-slate-500 rounded-md text-white w-full h-6" onClick={detail}>
                Detail
              </button>
              <button className="bg-slate-500 rounded-md text-white w-full h-6">Favorite</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
