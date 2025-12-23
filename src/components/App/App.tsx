import { useState } from "react";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";

function App() {
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", currentQuery, currentPage],
    queryFn: () => fetchMovies(currentQuery, currentPage),
    enabled: currentQuery !== "",
    placeholderData: keepPreviousData,
  });
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const closeModal = () => setSelectedMovie(null);
  const handleSearch = (query: string) => {
    setCurrentQuery(query);
  };

  const handleMovieSelect = (movie: Movie) => {
    if (movie) {
      setSelectedMovie(movie);
    } else {
      toast.error("Error: Movie not found");
    }
  };
  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && (
        <>
          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              forcePage={currentPage - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
          <MovieGrid movies={data.results} onSelect={handleMovieSelect} />
        </>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
