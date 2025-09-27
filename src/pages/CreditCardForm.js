import React, { useState } from "react";
import "./CreditCard.css"; // custom styles for card

export default function CreditCardForm({ onSubmit }) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ number, name, expiry, cvc });
  };

  return (
    <div className="credit-card-container">
      {/* Card Preview */}
      <div className={`credit-card ${isFlipped ? "flipped" : ""}`}>
        <div className="front">
          <div className="card-number">
            {number || "#### #### #### ####"}
          </div>
          <div className="card-holder">
            {name || "FULL NAME"}
          </div>
          <div className="card-expiry">
            {expiry || "MM/YY"}
          </div>
        </div>
        <div className="back">
          <div className="cvc">{cvc || "•••"}</div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="credit-card-form">
        <input
          type="text"
          placeholder="Card Number"
          maxLength="19"
          value={number}
          onChange={(e) => setNumber(e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim())}
        />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value.replace(/^(\d\d)(\d?)$/, "$1/$2"))}
          maxLength="5"
        />
        <input
          type="text"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
          maxLength="4"
          onFocus={() => setIsFlipped(true)}
          onBlur={() => setIsFlipped(false)}
        />
        <button type="submit" className="btn btn-success w-100 mt-3">
          Pay Now
        </button>
      </form>
    </div>
  );
}
