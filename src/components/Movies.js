import React from "react";
import "./Movies.css"; // for hover effects

export default function Movies({ movies, onBuy, onToggleTrailer, selectedTrailer }) {
  if (!movies || movies.length === 0) {
    return <p className="text-center mt-4">No movies available.</p>;
  }

  return (
    <div className="row">
      {movies.map((movie) => (
        <div key={movie._id} className="col-md-4 mb-4">
          <div className="card p-3 shadow-sm movie-card">
            <img src={movie.image} className="card-img-top movie-img" alt={movie.name} />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p className="card-text">🎭 Genre: {movie.genre}</p>
              <p className="card-text">🌍 Language: {movie.language}</p>
              <p className="card-text">📅 Release Date: {movie.releaseDate}</p>
              <p className="card-text">💰 Price: ₹{movie.price}</p>

              <div className="mt-2 d-flex gap-2">
                <button className="btn btn-danger hover-scale" onClick={() => onBuy(movie)}>
                  🎟 Buy Now
                </button>
                <button
                  className="btn btn-primary hover-scale"
                  onClick={() => onToggleTrailer(movie.trailer)}
                >
                  {selectedTrailer === movie.trailer ? "❌ Hide Trailer" : "▶ Watch Trailer"}
                </button>
              </div>

              {selectedTrailer === movie.trailer && (
                <div className="mt-3">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${movie.trailer}`}
                    title={`Trailer for ${movie.name}`}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
