import React from "react";
import styles from "./List.module.scss";

const List = ({ movies, handleSelectedMovie }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
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
