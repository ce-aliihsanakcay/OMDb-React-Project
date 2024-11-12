import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  setSelectedMovie,
  setSearchParams,
} from "../features/movies/moviesSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/loading";
import MovieList from "../components/movie/list";
import SearchBar from "../components/movie/searchBar";
import Pagination from "../components/pagination/pagination";

const Movies = () => {
  const { movies, searchParams, status, totalPages } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (movies.length > 0) return;
    dispatch(fetchMovies(searchParams));
  }, [dispatch, searchParams, movies]);

  const handleSelectedMovie = (e, movie) => {
    e.preventDefault();
    // console.log("handleSelectedMovie movie::::", movie);
    dispatch(setSelectedMovie(movie));
    navigate(`/movie/${movie.imdbID}`);
  };

  const setPaginationPage = (page) => {
    dispatch(setSearchParams({ ...searchParams, page }));
    dispatch(fetchMovies(searchParams));
  };

  return (
    <div>
      <div>
        <SearchBar />
      </div>
      <div>
        <MovieList movies={movies} handleSelectedMovie={handleSelectedMovie} />
        <Pagination
          totalPages={totalPages}
          currentPage={searchParams.page}
          handlePageChange={setPaginationPage}
        />
      </div>
      <div>{status === "loading" ? <Loading /> : ""}</div>
    </div>
  );
};

export default Movies;
