import React from "react";

export interface CardProps {
  id: number;
  image: string;
  title: string;
  release: string;
  detail: () => void;
  favorite?: () => void;
  remove?: () => void;
}

export interface SkeletonProps {
  cards: number;
}

export interface ButtonProps {
  onclick?: React.MouseEventHandler;
  label: string;
}

export interface LayoutProps {
  children?: React.ReactNode;
  showSearch: () => void;
  searchIcon: boolean;
}

export interface ModalProps {
  showModal: () => void;
  image: string | any;
  title: string | any;
  release: string | any;
  desc: string | any;
  id_props: number | any;
}

export interface NavbarProps {
  search: () => void;
  icon: boolean;
}

export interface PaginationProps {
  next: () => void;
  prev: () => void;
  numPage: number;
  totalPages: number;
}

export interface TrailerProps {
  id_video: string;
}
