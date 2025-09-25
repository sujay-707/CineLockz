import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Movies from "./Movies";

export default function MovieList() {
  const navigate = useNavigate();

  // Hardcoded movie data for frontend-only demo
 

  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("all");
  const [language, setLanguage] = useState("all");
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load movies on mount
  useEffect(() => {


     const demoMovies = [
    {
      _id: "1",
      name: "Salaar",
      genre: "Action",
      language: "Telugu",
      releaseDate: "2023",
      price: 270,
      image: "/assets/movies/salaar.jpg",
      trailer: "4GPvYMKtrtI",
      totalSeats: 50,
      bookedSeats: [],
    },
    {
      _id: "2",
      name: "Moana",
      genre: "Animation",
      language: "English",
      releaseDate: "2016",
      price: 200,
      image: "/assets/movies/Moana2.avif",
      trailer: "someTrailerId",
      totalSeats: 50,
      bookedSeats: [],
    },
    {
      _id: "3",
      name: "KANATRA 2025",
      genre: "Action",
      language: "Kannada",
      releaseDate: "2025",
      price: 250,
      image: "/assets/movies/Kantara.jpg",
      trailer: "gKJMgeEvSyE",
      totalSeats: 50,
      bookedSeats: [],
    },
    {
      _id: "4",
      name: "OG 2025",
      genre: "Action",
      language: "Telugu",
      releaseDate: "2025",
      price: 260,
      image: "/assets/movies/OG.jpg",
      trailer: "SuoXS9NwjYk",
      totalSeats: 50,
      bookedSeats: [],
    },
    
    {
      _id: "5",
      name: "WAR2 2025",
      genre: "Action",
      language: "Hindi",
      releaseDate: "2025",
      price: 280,
      image: "/assets/movies/War2.jpg",
      trailer: "vlZ_rfMDshI",
      totalSeats: 50,
      bookedSeats: [],
    },
    {
      _id: "6",
      name: "COOLIE 2025",
      genre: "Drama",
      language: "Tamil",
      releaseDate: "2025",
      price: 220,
      image: "/assets/movies/Coolie.jpg",
      trailer: "qeVfT2iLiu0",
      totalSeats: 50,
      bookedSeats: [],
    },
    {
      _id: "7",
      name: "RRR",
      genre: "Action",
      language: "Telugu",
      releaseDate: "2022",
      price: 270,
      image: "/assets/movies/rrr.jpeg",
      trailer: "NgBoMJy386M",
      totalSeats: 50,
      bookedSeats: [],
    },
    {
  _id: "8",
  name: "Spirit",
  genre: "Animation",
  language: "English",
  releaseDate: "2021",
  price: 210,
  image: "/assets/movies/Spirit.jpg",
  trailer: "abc123Trailer",
  totalSeats: 50,
  bookedSeats: [],
},
{
  _id: "9",
  name: "Lucky Bhaaskar",
  genre: "Comedy",
  language: "Hindi",
  releaseDate: "2020",
  price: 190,
  image: "/assets/movies/LuckyBhaaskar.jpg",
  trailer: "xyz456Trailer",
  totalSeats: 50,
  bookedSeats: [],
}
  ];
    // simulate async load
    const timer = setTimeout(() => {
      setMovies(demoMovies);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []); // ✅ static demoMovies, no dependency warning

  const handleBuy = (movie) => {
    navigate("/seat-selection", { state: { movie } });
  };

  const handleToggleTrailer = (trailer) => {
    setSelectedTrailer(selectedTrailer === trailer ? null : trailer);
  };

  const filteredMovies = movies.filter(
    (movie) => (genre === "all" || movie.genre === genre) && (language === "all" || movie.language === language)
  );

  if (loading)
    return <p className="text-center mt-5 fs-5 text-secondary">Loading movies...</p>;
  if (filteredMovies.length === 0)
    return <p className="text-center mt-5 fs-5 text-secondary">No movies match your filters.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4 fs-2 fw-bold">🎬 Watch Your Favorite Movie! 🍿</h2>

      {/* Filters */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-3 mb-2">
          <select
            className="form-select rounded-3 shadow-sm"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="all">All Genres</option>
            <option value="Action">Action</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Animation">Animation</option>
          </select>
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select rounded-3 shadow-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="all">All Languages</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Telugu">Telugu</option>
            <option value="Tamil">Tamil</option>
            <option value="Kannada">Kannada</option>
          </select>
        </div>
        <div className="col-md-3 mb-2 d-flex align-items-center">
          <span className="text-muted small">{filteredMovies.length} results</span>
        </div>
      </div>

      {/* Movie Cards */}
      <div className="row g-4">
        <Movies
          movies={filteredMovies}
          onBuy={handleBuy}
          onToggleTrailer={handleToggleTrailer}
          selectedTrailer={selectedTrailer}
        />
      </div>
    </div>
  );
}
