import axios from "axios";

const OMDB_BASE_URL = "http://www.omdbapi.com/";
const OMDB_API_KEY = "41442880";

//get movie list
export const fetchMoviesBySearch = async ({
  searchInput,
  type,
  releaseYear,
  page = 1,
}) => {
  if (!searchInput) {
    throw new Error("Movie title to search for is required!");
  }
  const queryParams = new URLSearchParams({
    apiKey: encodeURIComponent(OMDB_API_KEY),
    s: encodeURIComponent(searchInput),
    type: type ? encodeURIComponent(type) : "",
    y: releaseYear ? encodeURIComponent(releaseYear) : "",
    page: page ? encodeURIComponent(page) : "",
  });

  try {
    const url = `${OMDB_BASE_URL}?${queryParams}`;
    const response = await axios.get(url);
    if (response.data.Search?.length > 0) {
      let promises = response.data.Search.map(async (movie) =>
        fetchMovieByTitleOrImdbID({ imdbID: movie.imdbID })
      );
      promises = await Promise.allSettled(promises);
      response.data.Search = promises.map((p) => p.value);
    }
    // console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// get one movie
export const fetchMovieByTitleOrImdbID = async ({
  imdbID,
  title,
  type,
  releaseYear,
  plot,
}) => {
  if (!imdbID && !title) {
    throw new Error("One of imdbID or title is required!");
  }
  const queryParams = new URLSearchParams({
    apiKey: encodeURIComponent(OMDB_API_KEY),
    i: imdbID ? encodeURIComponent(imdbID) : "",
    t: title ? encodeURIComponent(title) : "",
    type: type ? encodeURIComponent(type) : "",
    y: releaseYear ? encodeURIComponent(releaseYear) : "",
    plot: plot ? encodeURIComponent(plot) : "",
  });

  try {
    const url = `${OMDB_BASE_URL}?${queryParams}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
