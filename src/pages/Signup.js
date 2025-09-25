import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", { email, password });
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#d32f2f" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 bg-white text-black rounded-4">
              <div className="card-body p-4">
                <div className="text-center mb-3">
                  <img src="/assets/banner/logo.png" alt="Logo" className="img-fluid" style={{ width: "450px" }} />
                </div>

                <h2 className="fw-bold text-center">Create Account</h2>
                <p className="text-center">Sign up for an amazing experience!</p>

                <div className="p-4 bg-white rounded-3">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <span className="input-group-text bg-white"><FaEnvelope className="text-danger" /></span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="input-group mb-4">
                      <span className="input-group-text bg-white"><FaLock className="text-danger" /></span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {error && <p className="text-danger text-center">{error}</p>}

                    <button type="submit" className="btn btn-danger w-100 fw-bold">Sign Up</button>
                  </form>

                  <p className="text-center mt-3">
                    Already have an account? <Link to="/login" className="text-danger fw-bold">Sign In</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
