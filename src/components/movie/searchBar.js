import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MOVIE_TYPES } from "../../constants/data";
import InputBar from "../input/inputBar";
import FilterSelection from "../dropdown/optionSelection";
import FilterYear from "../dropdown/yearSelection";
import { fetchMovies, setSearchParams } from "../../features/movies/moviesSlice";
import "./searchBar.scss"

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchParams } = useSelector((state) => state.movies);

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
    <div className="search-bar">
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
  );
};

export default SearchBar;
