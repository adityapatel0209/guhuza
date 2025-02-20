import React from "react";
import guhuzalogo from "../asset/logos/guhuza.svg";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      <header>
        <div className="navbar">
          <div className="logo">
            <a href="\"><img src={guhuzalogo} alt="Guhuza Logo" /></a>
          </div>
          <div className="nav">
            <ul>
              <li><Link to="/play">Play</Link></li>
              <li><Link to="/lb">Leaderboard</Link></li>
              <li><button className="login-signup-button" onClick={handleLogin}>Login</button></li>
              <li><button className="login-signup-button" onClick={handleSignup}>Signup</button></li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;