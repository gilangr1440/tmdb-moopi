// import React, { Component } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

import { FC } from "react";
import { SkeletonProps } from "../utils/component";

const CardSkeleton: FC<SkeletonProps> = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index: number) => (
      <div key={index} className="justify-self-center">
        <SkeletonTheme baseColor="#d8d8d8" highlightColor="#F5F5F5">
          <div className="w-44 h-96 p-3 text-center border border-slate-300 rounded-md border-solid">
            <Skeleton width={150} height={260} style={{ marginBottom: "0.75rem" }} />
            <Skeleton count={2} width={150} height={20} style={{ marginBottom: "0.40rem" }} />
            <div className="flex justify-between">
              <Skeleton width={60} height={20} style={{ marginBottom: "0.40rem" }} />
              <Skeleton width={60} height={20} style={{ marginBottom: "0.40rem" }} />
            </div>
          </div>
        </SkeletonTheme>
      </div>
    ));
};

export default CardSkeleton;
