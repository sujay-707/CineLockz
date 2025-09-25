import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const eventsData = [
  {
    id: 1,
    title: "K S Chithra Live In Concert Bangalore",
    category: "Music",
    languages: "Kannada, Bengali, Malayalam, Tamil, Telugu, Hindi",
    ageGroup: "All age groups",
    venue: "Phoenix Marketcity, Whitefield, Bangalore",
    date: "5th April 2025",
    time: "7 PM Onwards",
    price: 799,
    image: "/assets/events/chithra live.avif",
    youtube: "https://youtu.be/W0bkd7acwZ8",
  },
  {
    id: 2,
    title: "Vijay Prakash Live in Concert",
    category: "Music",
    venue: "Orion Mall, Rajajinagar",
    date: "5th April 2025",
    time: "6:30 PM Onwards",
    price: 699,
    image: "/assets/events/vijay prakash.avif",
  },
  {
    id: 3,
    title: "Kukdukoo Fest",
    category: "Kids",
    venue: "Bangalore",
    date: "5th & 6th April 2025",
    time: "11 AM - 6 PM",
    price: 599,
    image: "/assets/events/kukdukoo fest.avif",
  },
  {
    id: 4,
    title: "Awesome Place Indoor Play Area",
    category: "Kids",
    venue: "Nexus Mall Whitefield",
    date: "March 31 - April 31, 2025",
    time: "Open All Day",
    price: 599,
    image: "/assets/events/Awesome place Nexus.avif",
    youtube: "https://youtu.be/uOUsufeXiKQ",
  },
  {
    id: 5,
    title: "Awesome Place - Play & Adventure Zone",
    category: "Kids",
    venue: "Mantri Square Mall",
    date: "March 31 - April 15, 2025",
    time: "Open All Day",
    price: 499,
    image: "/assets/events/Awesome palce Mantri.avif",
  },
  {
    id: 6,
    title: "Papon Live @ AAB Spring Fest - 2025",
    category: "Music",
    languages: "Hindi, Assamese",
    ageGroup: "All age groups",
    venue: "Phoenix Marketcity, Whitefield, Bangalore",
    date: "6th April 2025",
    time: "5:30 PM",
    price: 150,
    image: "/assets/events/Papon.avif",
    youtube: "",
  },
];

const EventsPage = () => {
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [filteredPrice, setFilteredPrice] = useState("All");
  const navigate = useNavigate();

  const filteredEvents = eventsData.filter((event) => {
    const categoryMatch =
      filteredCategory === "All" || event.category === filteredCategory;
    const priceMatch =
      filteredPrice === "All" ||
      (filteredPrice === "100-200" && event.price >= 100 && event.price <= 200) ||
      (filteredPrice === "200-500" && event.price > 200 && event.price <= 500) ||
      (filteredPrice === "500-800" && event.price > 500 && event.price <= 800);
    return categoryMatch && priceMatch;
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Upcoming Events</h2>
      <div className="row">
        <div className="col-md-3">
          <h5>Filter by Category</h5>
          <select
            className="form-select mb-3"
            onChange={(e) => setFilteredCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Music">Music</option>
            <option value="Kids">Kids</option>
          </select>

          <h5>Filter by Price</h5>
          <select
            className="form-select"
            onChange={(e) => setFilteredPrice(e.target.value)}
          >
            <option value="All">All</option>
            <option value="100-200">100 - 200</option>
            <option value="200-500">200 - 500</option>
            <option value="500-800">500 - 800</option>
          </select>
        </div>

        <div className="col-md-9">
          <div className="row">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <img src={event.image} className="card-img-top" alt={event.title} />
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5> {/* Use event.title */}
                      <p className="card-text">
                        <strong>Venue:</strong> {event.venue} <br />
                        <strong>Date:</strong> {event.date} <br />
                        <strong>Time:</strong> {event.time || "To be announced"} <br />
                        <strong>Price:</strong> ₹{event.price}
                      </p>
                      {event.youtube && (
                        <a
                          href={event.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-danger me-2"
                        >
                          Watch Video
                        </a>
                      )}
                      <button
                        className="btn btn-danger"
                        onClick={() => navigate("/EventSportsPayment", { state: { event } })}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No events found for the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
