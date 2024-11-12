import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMoviesBySearch,
  fetchMovieByTitleOrImdbID,
} from "../../services/omdbApi";
import { MOVIE_ITEMS_PER_PAGE } from "../../constants/data";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ searchInput, type, releaseYear, page }) => {
    const response = await fetchMoviesBySearch({
      searchInput,
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
    totalMovies: 0,
    totalPages: 1,
    searchParams: {
      searchInput: "Pokemon",
      releaseYear: "",
      type: "",
      page: 1,
    },
  },
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovieDetails = action.payload;
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { Search, totalResults, Response, Error } = action.payload;
        if (Response === "True") {
          state.movies = Search;
          state.totalMovies = Number(totalResults);
          state.totalPages = Math.ceil(
            state.totalMovies / MOVIE_ITEMS_PER_PAGE
          );
        } else {
          state.movies = [];
          state.totalMovies = 0;
          state.error = Error;
        }
        state.status = "succeeded";
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovieDetails = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedMovie, setSearchParams } = movieListSlice.actions;

export default movieListSlice.reducer;
