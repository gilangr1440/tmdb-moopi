import React, { FC } from "react";
import { PaginationProps } from "../utils/component";
import { useModeContext } from "../context/modeContext";

const Pagination: FC<PaginationProps> = ({ next, prev, numPage, totalPages }) => {
  const { toggle } = useModeContext();
  return (
    <div>
      <div className="flex gap-5">
        {totalPages >= 2 && numPage != 1 ? (
          <button onClick={prev} className={`${toggle ? "bg-slate-200 text-slate-900" : "bg-slate-600 text-white"} h-8 w-8  rounded-sm text-center py-2`}>
            <i className="bx bx-chevron-left"></i>
          </button>
        ) : (
          <button onClick={prev} className={`${toggle ? "bg-slate-200 text-slate-900" : "bg-slate-600 text-white"} h-8 w-8  rounded-sm text-center py-2`} disabled>
            <i className="bx bx-chevron-left"></i>
          </button>
        )}
        <h1 className={`${toggle ? "bg-slate-200 text-slate-900" : "bg-slate-600 text-white"} h-8 w-16  rounded-sm text-center py-2`}>
          {numPage} / {totalPages}
        </h1>
        {totalPages >= 2 && numPage != totalPages ? (
          <button onClick={next} className={`${toggle ? "bg-slate-200 text-slate-900" : "bg-slate-600 text-white"} h-8 w-8  rounded-sm text-center py-2`}>
            <i className="bx bx-chevron-right"></i>
          </button>
        ) : (
          <button onClick={next} className={`${toggle ? "bg-slate-200 text-slate-900" : "bg-slate-600 text-white"} h-8 w-8  rounded-sm text-center py-2`} disabled>
            <i className="bx bx-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
