import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { useEffect } from "react";
import React from "react";
interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}
export default function MovieModal(props: MovieModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [props.onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={props.onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500/${props.movie.backdrop_path}`}
          alt={props.movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{props.movie.title}</h2>
          <p>{props.movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {props.movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {props.movie.vote_average} / 10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
