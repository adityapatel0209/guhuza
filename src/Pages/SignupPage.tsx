import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/SignupPage.css";
import guhuzalogo from "../asset/logos/guhuza.svg";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    const username = email.split("@")[0];

    try {
      await axios.post("http://localhost:3001/api/signup", { 
        firstName, 
        lastName, 
        email, 
        username, 
        password 
      });
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      toast.success("Signup successful!");
      navigate("/play");
    } catch (err) {
      setError("Error during signup");
      toast.error("Error during signup");
    }
  };
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="logo-section">
          <img src={guhuzalogo} alt="Guhuza Logo" className="logo" />
          <div className="welcome-text">
            <h1>Welcome Back</h1>
            <p>Already have an account? Sign in to continue</p>
          </div>
          <div className="separator" />
          <p className="login-link">
            Already a member? <a href="/login">Sign In</a>
          </p>
        </div>

        <div className="form-section">
          <div className="signup-header">
            <h2>Create Account</h2>
            <p>Get started by creating your free account</p>
          </div>

          <form onSubmit={handleSignup} className="form-grid">
            <div className="input-group">
              <div className="input-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-field full-width">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-field">
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
              <div className="input-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="button-container">
              <button type="submit" className="submit-button">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}