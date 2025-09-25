import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const sportsEvents = [
  {
    name: "Red Bull Moto Jam 2025",
    type: "Drifting, Stunt",
    language: "English",
    age: "2yrs+",
    duration: "3hrs",
    description: "An adrenaline-pumping motorsports showcase with drift cars, freestyle motocross, and stunt biking.",
    time: "6:30 PM",
    date: "Saturday, 12 April 2025",
    venue: "Island Ground, Chennai",
    price: 500,
    image: "/assets/sports/Red Bull Moto.avif",
  },
  {
    name: "Kolkata Knight Riders vs Sunrisers Hyderabad",
    type: "T20 Cricket",
    language: "English",
    age: "2yrs+",
    duration: "4hrs",
    date: "3 April 2025",
    venue: "Eden Gardens, Kolkata",
    price: 2000,
    image: "/assets/sports/Kolkata Knight Riders.avif",
  },
  {
    name: "Mumbai Indians vs Delhi Capitals",
    type: "T20 Cricket",
    language: "English",
    age: "2yrs+",
    duration: "4hrs",
    date: "15 May 2025",
    venue: "Wankhede Stadium, Mumbai",
    price: 3000,
    image: "/assets/sports/Mumbai Indians.avif",
  },
  {
    name: "Lucknow Super Giants vs Punjab Kings",
    type: "T20 Cricket",
    language: "English",
    duration: "4hrs 30mins",
    date: "1 April 2025",
    venue: "BRSABV Ekana Cricket Stadium, Lucknow",
    price: 1500,
    image: "/assets/sports/Lucknow Super Gaints.avif",
  },
  {
    name: "Bengaluru Freshathon Run (Run for Cancer)",
    type: "Marathon",
    duration: "4hrs",
    date: "6 April 2025",
    venue: "Cubbon Park, Bengaluru",
    price: 800,
    image: "/assets/sports/Bengaluru Freshathon.avif",
  },
  {
    name: "Chess Championship (Online) For All Age",
    type: "Chess",
    age: "All age groups",
    duration: "1hr",
    description: "An online chess championship promoting chess culture and cognitive skills. Open for all age groups.",
    date: "18 April 2025",
    time: "08:00 PM",
    venue: "Online Event",
    price: 200,
    image: "/assets/sports/Chess Championship.avif",
  },
];

export default function SportsPage() {
  const [priceFilter, setPriceFilter] = useState("all");
  const navigate = useNavigate();

  const filteredEvents = sportsEvents.filter((event) => {
    if (priceFilter === "100-500") return event.price >= 100 && event.price <= 500;
    if (priceFilter === "500-1000") return event.price > 500 && event.price <= 1000;
    if (priceFilter === "1000-5000") return event.price > 1000 && event.price <= 5000;
    return true;
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-white bg-white border border-3 border-grey rounded-pill p-2">
        <div className="container">
          <Link className="navbar-brand" to="/">Sports Hub</Link>
          <div className="navbar-nav">
            <Link className="nav-link fw-bold" to="/">Home</Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center text-primary mb-4">🏆 Upcoming Sports Events 🎟</h2>

        <div className="row mb-4">
          <div className="col-md-3">
            <select className="form-select" onChange={(e) => setPriceFilter(e.target.value)}>
              <option value="all">All Price Ranges</option>
              <option value="100-500">₹100 - ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="1000-5000">₹1000 - ₹5000</option>
            </select>
          </div>
        </div>

        <div className="row">
          {filteredEvents.map((event, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm">
                <img src={event.image} className="card-img-top" alt={event.name} />
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">🏁 Type: {event.type}</p>
                  <p className="card-text">📅 Date: {event.date}</p>
                  <p className="card-text">⏰ Time: {event.time || "TBD"}</p>
                  <p className="card-text">📍 Venue: {event.venue}</p>
                  <p className="card-text">⌛ Duration: {event.duration}</p>
                  <p className="card-text">💰 Price: ₹{event.price}</p>
                  <p className="card-text">{event.description}</p>
                  <div className="mt-2">
                    <button 
                      className="btn btn-danger" 
                      onClick={() => navigate("/EventSportsPayment", { state: { event } })}
                    >
                      🎟 Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center text-muted mt-4">
            <h5>No events available in this price range.</h5>
          </div>
        )}
      </div>
    </div>
  );
}
