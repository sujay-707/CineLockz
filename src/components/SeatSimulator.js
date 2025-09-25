import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SeatSimulator({ movieId, userTickets }) {
  const [seats, setSeats] = useState([]);
  const [qrInput, setQrInput] = useState("");
  const [message, setMessage] = useState("");

  const rows = ["A", "B", "C", "D", "E"];
  const cols = 10;

  useEffect(() => {
    const allSeats = [];
    rows.forEach((row) => {
      for (let i = 1; i <= cols; i++) {
        allSeats.push({ seatNumber: row + i, status: "available" });
      }
    });

    userTickets.forEach((ticket) => {
      ticket.seats.forEach((seat) => {
        const seatObj = allSeats.find((s) => s.seatNumber === seat);
        if (seatObj) {
          if (ticket.unlockedSeats?.includes(seat)) seatObj.status = "unlocked";
          else seatObj.status = "booked";
        }
      });
    });

    setSeats(allSeats);
  }, [userTickets]);

  const handleValidateQRCode = async () => {
    if (!qrInput) {
      setMessage("Please enter a QR code.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/tickets/validate", {
        qrCode: qrInput,
        seatNumber: qrInput.slice(0, 2), // Adjust according to your QR format
      });

      setSeats((prev) =>
        prev.map((s) =>
          s.seatNumber === res.data.seatNumber ? { ...s, status: "unlocked" } : s
        )
      );

      setMessage(`✅ ${res.data.seatNumber} unlocked successfully!`);
      setQrInput("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error validating QR code.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">🎟 Seat Simulator</h2>

      <div className="mb-3 text-center">
        <input
          type="text"
          placeholder="Enter QR Code"
          value={qrInput}
          onChange={(e) => setQrInput(e.target.value)}
          className="form-control d-inline-block w-auto"
        />
        <button className="btn btn-success ms-2" onClick={handleValidateQRCode}>
          Unlock Seat
        </button>
      </div>

      {message && <p className="text-center">{message}</p>}

      <div
        className="d-flex flex-wrap justify-content-center"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        {seats.map((seat) => (
          <div
            key={seat.seatNumber}
            style={{
              width: "40px",
              height: "40px",
              margin: "5px",
              textAlign: "center",
              lineHeight: "40px",
              borderRadius: "5px",
              border: "1px solid #000",
              backgroundColor:
                seat.status === "available"
                  ? "#fff"
                  : seat.status === "booked"
                  ? "#f44336"
                  : "#4caf50",
              color: seat.status === "available" ? "#000" : "#fff",
              cursor: seat.status === "available" ? "default" : "pointer",
            }}
          >
            {seat.seatNumber}
          </div>
        ))}
      </div>
    </div>
  );
}
