import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./pages/movies";
import MovieDetails from "./pages/movieDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
