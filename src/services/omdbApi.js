import axios from "axios";

const { 
    REACT_APP_OMDB_API_KEY: apiKey, 
    OMDB_BASE_URL 
} =process.env;

//list geliyor
export const fetchMoviesBySearch = async ({searchTerm, type, releaseYear, page = 1}) => {
  if (!searchTerm) {
    throw new Error("Movie title to search for is required!");
  }
  const queryParams = new URLSearchParams({
    apiKey,
    s: searchTerm,
    type: type || "",
    y: releaseYear || "",
    page: page || ""
  });
  
  try {
    const url = `${OMDB_BASE_URL}?${queryParams}`;
    console.log("url:::", url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

//1 kayıt geliyor
export const fetchMovieByTitleOrImdbID = async ({imdbID, title, type, releaseYear, plot}) => {
  if (!imdbID && !title) {
    throw new Error("One of imdbID or title is required!");
  }
  const queryParams = new URLSearchParams({
    apiKey,
    i: imdbID || "",
    t: title || "",
    type: type || "",
    y: releaseYear || "",
    plot: plot || ""
  });
  
  try {
    const url = `${OMDB_BASE_URL}?${queryParams}`;
    console.log("url:::", url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
