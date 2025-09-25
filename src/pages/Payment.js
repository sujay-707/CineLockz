import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { movie, selectedSeats, selectedDate, selectedTime, totalPrice } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  // FIX: get user correctly
  const user = JSON.parse(localStorage.getItem("user"));

  if (!movie || !selectedSeats || !selectedDate || !selectedTime || !user) {
    return (
      <div className="container text-center mt-5">
        <h3>Invalid Booking Data</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/movies")}>
          Back to Movies
        </button>
      </div>
    );
  }

  const proceedPayment = async () => {
    setLoading(true);
    try {
      const ticketData = {
        userId: user._id,
        movieId: movie._id,
        seats: selectedSeats,
        date: selectedDate,
        time: selectedTime,
        totalPrice,
        movieName: movie.name,
        userEmail: user.email,
        paymentMethod,
      };

      const res = await axios.post("http://localhost:5000/api/tickets", ticketData);

      // Navigate to ticket page
      navigate("/ticket", { state: { ticket: res.data, movie } });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment Failed!");
    } finally {
      setLoading(false);
    }
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
