import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreditCardForm from "./CreditCardForm";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, selectedSeats, selectedDate, selectedTime, totalPrice } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  if (!movie) {
    return <div className="container text-center mt-5">Invalid Booking</div>;
  }

  const proceedPayment = (cardDetails) => {
    setLoading(true);

    setTimeout(() => {
      const ticket = {
        movie,
        seats: selectedSeats,
        date: selectedDate,
        time: selectedTime,
        totalPrice,
        paymentMethod,
        cardDetails,
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

      {paymentMethod === "card" && (
        <CreditCardForm onSubmit={proceedPayment} />
      )}

      {paymentMethod !== "card" && (
        <div className="text-center">
          <p><strong>Total:</strong> ₹{totalPrice}</p>
          <button className="btn btn-success w-50" onClick={() => proceedPayment()}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      )}
    </div>
  );
}
