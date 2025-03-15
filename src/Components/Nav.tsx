import React, { useState, useEffect } from "react";
import guhuzalogo from "../asset/logos/guhuza.svg";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setUsername(null);
    navigate('/login');
  };

  return ( 
    <>
      <header>
        <div className="navbar-container">
        <div className="navbar">
          <div className="logo-nav">
            <Link to="/"><img src={guhuzalogo} alt="Guhuza Logo" /></Link>
          </div>
          <div className="nav">
            <ul>
              <li><Link to="/play">Play</Link></li>
              <li><Link to="/lb">Leaderboard</Link></li>
              <li className="username-container">
                <button className="login-signup-button" onClick={() => {
                  if (username) {
                    setShowPopup(!showPopup);
                  } else {
                    handleLogin();
                  }
                }}>
                  {username ? username : "Sign In"}
                </button>
                {showPopup && username && (
                  <div className="popup">
                    <button onClick={handleSignOut}>Sign Out</button>
                  </div>
                )}
              </li>
            </ul>
            </div>
            </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;