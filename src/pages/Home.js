import React from "react";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

const Home = ({ darkMode }) => {
  return (
    <div className={darkMode ? "bg-dark text-white min-vh-100 d-flex flex-column" : "bg-light text-dark min-vh-100 d-flex flex-column"}>
      <Carousel />
      <div className="container mt-4 flex-grow-1">
        <MovieList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
