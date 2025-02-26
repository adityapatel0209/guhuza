import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/LoginPage.css";
import guhuzalogo from "../asset/logos/guhuza.svg";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", { username, password });
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      toast.success("Login successful!");
      navigate("/play");
    } catch (err) {
      setError("Invalid username or password");
      toast.error("Invalid username or password");
    }
  };

  const handleSignupNavigation = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-section">
          <img src={guhuzalogo} alt="Guhuza Logo" className="logo" />
          <div className="welcome-text">
            <h1>Welcome Back</h1>
            <p>Please login to your account to continue</p>
          </div>
          <div className="separator" />
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>

        <div className="form-section">
          <div className="login-header">
            <h2>Login</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="form-grid">
            <div className="input-field full-width">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-field full-width">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <div className="button-container">
              <button type="submit" className="submit-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}