import React from "react";
import "./list.scss";

const List = ({ movies, handleSelectedMovie }) => {
  return (
    <div className={"tableContainer"}>
      <table className={"table"}>
        <caption>
          <h2>Movie List</h2>
        </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Release Date</th>
            <th>IMDb ID</th>
            <th>imdbRating</th>
            <th>Director</th>
            <th>Genre</th>
            <th>Type</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index} onClick={(e) => handleSelectedMovie(e, movie)}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
              <td>{movie.imdbID}</td>
              <td>{movie.imdbRating}</td>
              <td>{movie.Director}</td>
              <td>{movie.Genre}</td>
              <td>{movie.Type}</td>
              <td>{movie.Country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
