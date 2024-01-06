import React, { FC } from "react";
import { TrailerProps } from "../utils/component";

const Trailer: FC<TrailerProps> = ({ id_video }) => {
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
};

export default Trailer;
