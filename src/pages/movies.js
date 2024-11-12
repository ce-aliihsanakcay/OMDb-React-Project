import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  setSelectedMovie,
  setSearchParams,
} from "../features/movies/moviesSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/loading";
import InputBar from "../components/inputBar";
import FilterSelection from "../components/filterSelection";
import FilterYear from "../components/filterYear";
import MovieList from "../components/movieList/list";
import { MOVIE_TYPES } from "../constants/data";

const Movies = () => {
  const { movies, searchParams, status } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (movies.length > 0) return;
    dispatch(fetchMovies(searchParams));
  }, [dispatch, searchParams, movies]);

  const handleSelectedMovie = (e, movie) => {
    e.preventDefault();
    console.log("handleSelectedMovie movie::::", movie);
    dispatch(setSelectedMovie(movie));
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleSearch = () => {
    dispatch(fetchMovies(searchParams));
  };

  const setSearchInput = (searchInput) => {
    dispatch(setSearchParams({ ...searchParams, searchInput }));
  };

  const setReleaseYear = (releaseYear) => {
    dispatch(setSearchParams({ ...searchParams, releaseYear }));
  };

  const setMovieType = (type) => {
    dispatch(setSearchParams({ ...searchParams, type }));
  };

  return (
    <div>
      <div>
        <InputBar
          setInputValue={setSearchInput}
          inputValue={searchParams.searchInput}
        />
        <FilterYear setYear={setReleaseYear} year={searchParams.releaseYear} />
        <FilterSelection
          option={searchParams.type}
          setOption={setMovieType}
          optionList={MOVIE_TYPES}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <MovieList movies={movies} handleSelectedMovie={handleSelectedMovie} />
      </div>
      <div>{status === "loading" ? <Loading /> : ""}</div>
    </div>
  );
};

export default Movies;
