import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketRef = useRef();

  const { ticket, movie } = location.state || {};

  if (!ticket || !movie || !ticket.seats?.length) {
    return (
      <div className="container text-center mt-5">
        <h3>Invalid Ticket Details</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/movies")}>
          Back to Movies
        </button>
      </div>
    );
  }

  const downloadTicketImage = async () => {
    if (!ticketRef.current) return;
    try {
      const canvas = await html2canvas(ticketRef.current, { scale: 2 });
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `${movie.name}_Ticket.png`;
      link.click();
    } catch (err) {
      console.error("Error downloading ticket:", err);
      alert("Failed to download ticket image.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div ref={ticketRef} className="card shadow p-4 text-center" style={{ maxWidth: "400px" }}>
        <h2>🎟 Your Ticket</h2>
        <img src={movie.image} alt={movie.name} className="img-fluid rounded mb-3" />
        <p><strong>Movie:</strong> {movie.name}</p>
        <p><strong>Date:</strong> {ticket.date}</p>
        <p><strong>Time:</strong> {ticket.time}</p>
        <p><strong>Seats:</strong> {ticket.seats.join(", ")}</p>
        <p><strong>Total Price:</strong> ₹{ticket.totalPrice}</p>

        {ticket.seats.map((seat, index) => (
          <div key={seat} className="mb-3">
            <QRCodeCanvas value={ticket.qrCodes[index]} size={150} />
            <p className="mt-2"><strong>Code:</strong> {ticket.qrCodes[index]}</p>
          </div>
        ))}

        <button className="btn btn-success w-100 mt-3" onClick={downloadTicketImage}>
          Download Ticket as Image 🎟
        </button>
        <button className="btn btn-primary w-100 mt-2" onClick={() => navigate("/movies")}>
          Back to Movies
        </button>
      </div>
    </div>
  );
}
