import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../features/movies/moviesSlice";

const MovieDetails = () => {
  const { selectedMovieDetails: movie } = useSelector((state) => state.movies);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(movie).length !== 0) return;
    dispatch(fetchMovieDetails({ imdbID: id }));
  }, [dispatch, movie, id]);

  return (
    <div>
      <div>{movie.Title}</div>
    </div>
  );
};

export default MovieDetails;
