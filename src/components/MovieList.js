import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Movies from "./Movies";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("all");
  const [language, setLanguage] = useState("all");
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load movies.");
        setLoading(false);
      });
  }, []);

const handleBuy = (movie) => {
  // Navigate to seat selection page first
  navigate("/seat-selection", { state: { movie } });
};


  const handleToggleTrailer = (trailer) => {
    setSelectedTrailer(selectedTrailer === trailer ? null : trailer);
  };

  const filteredMovies = movies.filter(
    (movie) => (genre === "all" || movie.genre === genre) && (language === "all" || movie.language === language)
  );

  if (loading) return <p className="text-center mt-5 fs-5 text-secondary">Loading movies...</p>;
  if (error) return <p className="text-center mt-5 fs-5 text-danger fw-semibold">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4 fs-2 fw-bold">🎬 Watch Your Favorite Movie! 🍿</h2>
      <div className="row mb-4 justify-content-center">
        <div className="col-md-3 mb-2">
          <select className="form-select rounded-3 shadow-sm" onChange={(e) => setGenre(e.target.value)}>
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
          <select className="form-select rounded-3 shadow-sm" onChange={(e) => setLanguage(e.target.value)}>
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

      <div className="row g-4">
        {filteredMovies.length === 0 ? (
          <div className="col-12 text-center py-5 text-secondary fs-5">No movies match your filters.</div>
        ) : (
          <Movies movies={filteredMovies} onBuy={handleBuy} onToggleTrailer={handleToggleTrailer} selectedTrailer={selectedTrailer} />
        )}
      </div>
    </div>
  );
}
