import { FC } from "react";
import { PaginationProps } from "../utils/component";

const Pagination: FC<PaginationProps> = ({ next, prev, numPage, totalPages }) => {
  return (
    <div>
      <div className="flex gap-5">
        {totalPages >= 2 && numPage != 1 ? (
          <button onClick={prev} className={` bg-slate-600 text-white h-8 w-8  rounded-sm text-center py-2`}>
            <i className="bx bx-chevron-left"></i>
          </button>
        ) : (
          <button onClick={prev} className={` bg-slate-600 text-white h-8 w-8  rounded-sm text-center py-2`} disabled>
            <i className="bx bx-chevron-left"></i>
          </button>
        )}
        <h1 className={` bg-slate-600 text-white h-8 w-16  rounded-sm text-center py-2`}>
          {numPage} / {totalPages}
        </h1>
        {totalPages >= 2 && numPage != totalPages ? (
          <button onClick={next} className={` bg-slate-600 text-white h-8 w-8  rounded-sm text-center py-2`}>
            <i className="bx bx-chevron-right"></i>
          </button>
        ) : (
          <button onClick={next} className={` bg-slate-600 text-white h-8 w-8  rounded-sm text-center py-2`} disabled>
            <i className="bx bx-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
