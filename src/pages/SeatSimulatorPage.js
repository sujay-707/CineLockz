import React, { useState } from "react";
import axios from "axios";
import "./SeatSimulatorPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SeatSimulatorPage() {
  const seatCategories = [
    { type: "Recliner", rows: ["A", "B"], price: 300, img: "/assets/seats/blue-seat.png" },
    { type: "Gold", rows: ["C", "E"], price: 200, img: "/assets/seats/red-seat.png" },
    { type: "Silver", rows: ["D", "F"], price: 150, img: "/assets/seats/red-seat.png" },
  ];

  const seatNumbers = [1,2,3,4,5,6,7,8,9,10]; // matches selection page
  const [qrCodeInput, setQrCodeInput] = useState("");
  const [unlockedSeats, setUnlockedSeats] = useState([]);
  const [message, setMessage] = useState("");

  const handleUnlock = async (seat) => {
    if (!qrCodeInput) {
      setMessage("❌ Please enter QR code first!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/tickets/validate", {
        qrCode: qrCodeInput,
        seat: seat,
      });

      if (!unlockedSeats.includes(seat)) {
        setUnlockedSeats([...unlockedSeats, seat]);
      }

      setMessage(`✅ Seat ${seat} unlocked successfully!`);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error unlocking seat");
    }
  };

  return (
    <div className="seat-simulator-container container mt-5">
      <h2 className="text-center mb-4">🎟 Seat Simulator</h2>

      {message && (
        <div className="alert alert-info text-center mt-3">{message}</div>
      )}

      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Enter your QR code"
          className="form-control w-50 mx-auto"
          value={qrCodeInput}
          onChange={(e) => setQrCodeInput(e.target.value)}
        />
      </div>

      {seatCategories.map((category) => (
        <div key={category.type} className="mb-4">
          <h5 className="text-center mb-2">{category.type} Seats (₹{category.price})</h5>
          <div className="d-flex justify-content-center flex-wrap">
            {category.rows.map((row) =>
              seatNumbers.map((num) => {
                const seat = `${row}${num}`;
                const isUnlocked = unlockedSeats.includes(seat);

                return (
                  <div key={seat} className="seat-wrapper">
                    <div
                      className={`seat-image ${isUnlocked ? "unlocked" : ""}`}
                      style={{
                        backgroundImage: `url(${category.img})`,
                      }}
                      title={seat}
                    ></div>
                    <div className="seat-label">{seat}</div>

                    {!isUnlocked && (
                      <button
                        className="btn btn-sm btn-primary unlock-btn"
                        onClick={() => handleUnlock(seat)}
                      >
                        Unlock
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
