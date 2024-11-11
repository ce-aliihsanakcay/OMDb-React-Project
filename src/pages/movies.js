import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, setSelectedMovie } from "../features/movies/moviesSlice";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const { movies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies({ searchTerm: "inc" }));
  }, [dispatch]);

  const handleSelectedMovie = (e, movie) => {
    e.preventDefault();
    console.log("handleSelectedMovie movie::::", movie);
    dispatch(setSelectedMovie(movie));
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div>
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
    </div>
  );
};

export default Movies;
