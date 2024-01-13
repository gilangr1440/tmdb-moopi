import React, { FC } from "react";
import { ButtonProps } from "../utils/component";

const GenreButton: FC<ButtonProps> = ({ onclick, label }) => {
  return (
    <div>
      <button onClick={onclick} className={` bg-slate-500 text-white hover:bg-slate-600 rounded-full p-2`}>
        {label}
      </button>
    </div>
  );
};

export default GenreButton;
