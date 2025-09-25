import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { movie, selectedSeats, selectedDate, selectedTime, totalPrice } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  if (!movie || !selectedSeats || !selectedDate || !selectedTime) {
    return (
      <div className="container text-center mt-5">
        <h3>Invalid Booking Data</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/movies")}>
          Back to Movies
        </button>
      </div>
    );
  }

  const proceedPayment = () => {
    setLoading(true);

    setTimeout(() => {
      const ticket = {
        movie,
        seats: selectedSeats,
        date: selectedDate,
        time: selectedTime,
        totalPrice,
        paymentMethod,
        qrCodes: selectedSeats.map((s, i) => `TICKET-${s}-${Date.now() + i}`)
      };

      localStorage.setItem("latestTicket", JSON.stringify(ticket));
      setLoading(false);

      navigate("/ticket", { state: { ticket, movie } });
    }, 1000);
  };

  return (
    <div className="payment-page container mt-5">
      <h2 className="text-center mb-4">Payment for {movie.name}</h2>

      <h4>Select Payment Method</h4>
      <select
        className="form-select mb-3"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="card">Card</option>
        <option value="upi">UPI</option>
        <option value="netbanking">Netbanking</option>
      </select>

      <div className="text-center mt-3">
        <p><strong>Total:</strong> ₹{totalPrice}</p>
        <button className="btn btn-success w-50" onClick={proceedPayment} disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
