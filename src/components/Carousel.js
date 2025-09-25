import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensures Bootstrap functionality works

const Carousel = () => {
  return (
    <div id="movieCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">

        {/* Slide 1 */}
        <div className="carousel-item active" data-bs-interval="2000">
          <img src="/assets/banner/banner1.png" className="d-block w-100" alt="Banner 1" />
        </div>


        {/* Slide 2*/}
        <div className="carousel-item" data-bs-interval="2000">
          <img src="/assets/banner/banner2.jpg" className="d-block w-100" alt="Banner 3" />
        </div>

        {/* Slide 3*/}
        <div className="carousel-item" data-bs-interval="2000">
          <img src="/assets/banner/banner3.png" className="d-block w-100" alt="Banner 4" />
        </div>

        {/* Slide 4*/}
        <div className="carousel-item" data-bs-interval="2000">
          <img src="/assets/banner/banner4.avif" className="d-block w-100" alt="Banner 5" />
        </div>

        {/* Slide 5*/}
        <div className="carousel-item" data-bs-interval="2000">
          <img src="/assets/banner/banner5.avif" className="d-block w-100" alt="Banner 6" />
        </div>


      </div>

      {/* Carousel Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="prev"
        style={{ left: "-5%" }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="next"
        style={{ right: "-5%" }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
