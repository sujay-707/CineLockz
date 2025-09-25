import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const seatPrices = {
  public: 1,
  golden: 1.5,
  diamond: 2,
};

const EventSportsPayment = () => {
  const location = useLocation();
  const { event, sport } = location.state || {};
  const item = event || sport;

  const [seatType, setSeatType] = useState("public");
  const [seatCount, setSeatCount] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!item) {
    return <p className="text-center text-danger">No event or sport selected for booking.</p>;
  }

  const eventName = item.title || item.name || "Not Specified";
  const basePrice = parseFloat(item.price) || 0;
  const totalPrice = (basePrice * seatCount * seatPrices[seatType]).toFixed(2);

  const handlePayment = () => {
    setPaymentSuccess(true);
  };

  const handleDownloadTicket = () => {
    const ticketContent = `🎟 Event/Sport Ticket 🎟\n----------------------\nEvent/Sport: ${eventName}\nSeat Type: ${seatType}\nSeats: ${seatCount}\nTotal Price: ₹${totalPrice}`;
    
    const blob = new Blob([ticketContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Ticket.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="payment-page">
      <div className="container mt-4">
        <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "500px", borderRadius: "12px" }}>
          <h2 className="text-center mb-4">🎟 Book Your Tickets</h2>
          <h5 className="text-center">{eventName}</h5>
          <p className="text-center"><strong>Base Price:</strong> ₹{basePrice.toFixed(2)} per seat</p>

          <label className="form-label">Select Seat Type:</label>
          <select className="form-select mb-3" value={seatType} onChange={(e) => setSeatType(e.target.value)}>
            {Object.keys(seatPrices).map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)} - ₹{(basePrice * seatPrices[type]).toFixed(2)}
              </option>
            ))}
          </select>

          <label className="form-label">Number of Seats:</label>
          <input
            type="number"
            className="form-control mb-3"
            value={seatCount}
            min="1"
            max="10"
            onChange={(e) => setSeatCount(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
          />

          <h5 className="text-center">Total Price: ₹{totalPrice}</h5>

          {!paymentSuccess ? (
            <button className="btn btn-success w-100" onClick={handlePayment}>
              Proceed to Payment
            </button>
          ) : (
            <div className="text-center">
              <h4 className="text-success mt-3">✅ Payment Successful!</h4>
              <button className="btn btn-primary mt-3" onClick={handleDownloadTicket}>
                Download Ticket 🎟
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .payment-page {
          background-color: #dc143c;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card {
          background: white;
          border-radius: 12px;
        }
        .btn {
          transition: all 0.3s ease-in-out;
        }
        .btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default EventSportsPayment;
