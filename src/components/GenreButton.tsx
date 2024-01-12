import React, { FC } from "react";
import { ButtonProps } from "../utils/component";
import { useModeContext } from "../context/modeContext";

const GenreButton: FC<ButtonProps> = ({ onclick, label }) => {
  const { toggle } = useModeContext();
  return (
    <div>
      <button onClick={onclick} className={`${toggle ? "bg-slate-200 text-slate-900" : "bg-slate-500 text-white"}  hover:bg-slate-600 rounded-full p-2`}>
        {label}
      </button>
    </div>
  );
};

export default GenreButton;
