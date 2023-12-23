import React, { Component } from "react";

interface TrailerProps {
  id_video: string;
}

export class Trailer extends Component<TrailerProps> {
  render() {
    const { id_video } = this.props;
    return (
      <div>
        <iframe
          width="260"
          src={`https://www.youtube.com/embed/${id_video}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; 
  autoplay; 
  clipboard-write; 
  encrypted-media; 
  gyroscope; 
  picture-in-picture; 
  web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
}

export default Trailer;
