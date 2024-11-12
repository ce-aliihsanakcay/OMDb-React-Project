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
import { MOVIE_TYPES } from "../constants/data";

const Movies = () => {
  const { movies, searchParams, status } = useSelector((state) => state.movies);
  // console.log("xxx searchParams: ", searchParams);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (movies.length > 0) return;
    dispatch(fetchMovies(searchParams));
  }, [dispatch, searchParams]);

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
      <div className="movie-list">
        <h2>Movie List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Release Date</th>
              <th>IMDb ID</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index} onClick={(e) => handleSelectedMovie(e, movie)}>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>{status === "loading" ? <Loading /> : ""}</div>
    </div>
  );
};

export default Movies;
