import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./seatSelection.css";

export default function SeatSelectionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const seatCategories = [
    { type: "Recliner", rows: ["A", "B"], price: 300, img: "/assets/seats/blue-seat.png" },
    { type: "Gold", rows: ["C", "E"], price: 200, img: "/assets/seats/red-seat.png" },
    { type: "Silver", rows: ["D", "F"], price: 150, img: "/assets/seats/red-seat.png" },
  ];

  const seatNumbers = [1,2,3,4,5,6,7,8,9,10];
  const showTimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];

  if (!movie) {
    return (
      <div className="container text-center mt-5">
        <h3>No movie selected!</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/movies")}>
          Back to Movies
        </button>
      </div>
    );
  }

  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const getTotal = () => {
    let total = 0;
    selectedSeats.forEach(seat => {
      seatCategories.forEach(cat => {
        if (cat.rows.includes(seat.charAt(0))) total += cat.price;
      });
    });
    return total;
  };

  const proceedToPayment = () => {
    if (!selectedSeats.length || !selectedDate || !selectedTime) {
      alert("Select at least one seat, date, and time!");
      return;
    }

    navigate("/payment", {
      state: { movie, selectedSeats, selectedDate, selectedTime, totalPrice: getTotal() }
    });
  };

  return (
    <div className="seat-selection-page container mt-5">
      <h2 className="text-center mb-4">{movie.name} 🎬 - Select Seats</h2>

      <div className="d-flex justify-content-center gap-3 flex-wrap mb-3">
        <input
          type="date"
          className="form-control w-auto"
           style={{ color: "black", backgroundColor: "#bcddf4ff" }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <select
          className="form-select w-auto"
           style={{ color: "black", backgroundColor: "#ead2d2ff" }}
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Select Show Time</option>
          {showTimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      {seatCategories.map(category => (
        <div key={category.type} className="mb-4">
          <h6>{category.type} Seats (₹{category.price})</h6>
          <div className="seat-layout">
            {category.rows.map(row => (
              <div key={row} className="seat-row">
                {seatNumbers.map(num => {
                  const seat = `${row}${num}`;
                  const isSelected = selectedSeats.includes(seat);
                  return (
                    <div key={seat} className="seat-wrapper">
                      <div
                        className={`seat-box ${isSelected ? "selected" : ""}`}
                        style={{ backgroundImage: `url(${category.img})` }}
                        onClick={() => toggleSeat(seat)}
                      >
                        <span className="seat-number">{seat}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="screen-label">--- Screen This Way ---</div>

      <div className="text-center mt-4">
        <p><strong>Total:</strong> ₹{getTotal()}</p>
        <button className="btn btn-success w-50" onClick={proceedToPayment}>
          Next → Payment
        </button>
      </div>
    </div>
  );
}
