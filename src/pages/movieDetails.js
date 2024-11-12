import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../features/movies/moviesSlice";
import "./movieDetails.scss";

const MovieDetails = () => {
  const { selectedMovieDetails: movie } = useSelector((state) => state.movies);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(movie).length !== 0) return;
    dispatch(fetchMovieDetails({ imdbID: id }));
  }, [dispatch, movie, id]);

  return (
    <div className="movie-details">
      <div className="movie-image-container">
        <img src={`${movie.Poster}`} alt={`${movie.Title}`} />
      </div>
      <div className="movie-info-container">
        <h2>{movie.Title}</h2>
        <p>
          <label>Year: </label> {movie.Year} <label>Released: </label>
          {movie.Released}
        </p>
        <p>
          <label>Type: </label>
          {movie.Type}
        </p>
        <p>
          <label>Genre: </label>
          {movie.Genre}
        </p>
        <p>
          <label>Writer: </label> {movie.Writer}
        </p>
        <p>
          <label>Actors: </label> {movie.Actors}
        </p>
        <p>
          <label>Plot: </label>
          {movie.Plot}
        </p>
        <p>
          <label>Duration: </label>
          {movie.Runtime}
        </p>
        <p>
          <label>Language: </label>
          {movie.Language}
        </p>
        <p>
          <label>imdbRating: </label>
          {movie.imdbRating}
        </p>
        <p>
          <label>Awards: </label> {movie.Awards}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
