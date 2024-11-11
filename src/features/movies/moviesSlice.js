import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMoviesBySearch,
  fetchMovieByTitleOrImdbID,
} from "../../services/omdbApi";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ searchTerm, type, releaseYear, page }) => {
    const response = await fetchMoviesBySearch({
      searchTerm,
      type,
      releaseYear,
      page,
    });
    return response;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async ({ imdbID, title, type, releaseYear, plot }) => {
    const response = await fetchMovieByTitleOrImdbID({
      imdbID,
      title,
      type,
      releaseYear,
      plot,
    });
    return response;
  }
);

const movieListSlice = createSlice({
  name: "movies",
  initialState: {
    selectedMovieDetails: {},
    movies: [],
    status: null,
    totalResults: 0,
  },
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovieDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { Search, totalResults } = action.payload;
        state.movies = Search;
        state.totalResults = Number(totalResults);
        state.status = "succeeded";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovieDetails = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSelectedMovie } = movieListSlice.actions

export default movieListSlice.reducer;
