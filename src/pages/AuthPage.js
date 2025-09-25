import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";

const AuthPage = ({ setIsAuthenticated, setUser }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignIn) {
        const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        localStorage.setItem("user", JSON.stringify(data));
        setIsAuthenticated(true);
        setUser(data);

        // redirect
        if (data.isAdmin) window.location.href = "/admin"; 
        else window.location.href = "/";
      } else {
        const { data } = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
        localStorage.setItem("user", JSON.stringify(data));
        setIsAuthenticated(true);
        setUser(data);
        window.location.href = "/";
      }
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

                <h2 className="fw-bold text-center">{isSignIn ? "Welcome Back!" : "Create Account"}</h2>
                <p className="text-center">{isSignIn ? "Sign in to book your favorite movies!" : "Sign up for an amazing experience!"}</p>

                <div className="d-flex justify-content-center gap-3 mb-3">
                  <button className={`btn w-50 ${isSignIn ? "btn-danger text-white" : "btn-outline-danger"}`} onClick={() => setIsSignIn(true)}>Sign In</button>
                  <button className={`btn w-50 ${!isSignIn ? "btn-danger text-white" : "btn-outline-danger"}`} onClick={() => setIsSignIn(false)}>Sign Up</button>
                </div>

                <div className="p-4 bg-white rounded-3">
                  <form onSubmit={handleSubmit}>
                    {!isSignIn && (
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-white"><FaUser className="text-danger" /></span>
                        <input type="text" className="form-control" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                    )}

                    <div className="input-group mb-3">
                      <span className="input-group-text bg-white"><FaEnvelope className="text-danger" /></span>
                      <input type="email" className="form-control" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="input-group mb-4">
                      <span className="input-group-text bg-white"><FaLock className="text-danger" /></span>
                      <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    {error && <p className="text-danger text-center">{error}</p>}

                    <button type="submit" className="btn btn-danger w-100 fw-bold">{isSignIn ? "Sign In" : "Sign Up"}</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
