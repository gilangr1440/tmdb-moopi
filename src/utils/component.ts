import React from "react";

export interface CardProps {
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
  image: string;
  title: string;
  release: string;
  desc: string;
  id_props: number;
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
