import React from "react";

export interface DetailProps {
  location: any;
  navigate: any;
}

export type Movie = {
  id?: number;
  poster_path?: string;
  title?: string;
  release_date?: string;
  overview?: string;
};

export interface FavProps {
  navigate: any;
}

export interface PopProps {
  navigate: any;
}

export interface HomeProps {
  navigate: any;
}

export interface SearchProps {
  location: any;
  navigate: any;
}
