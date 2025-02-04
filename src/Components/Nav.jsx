import React from "react";
import guhuzalogo from "../asset/logos/guhuza.svg"
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <header>
                <div className="navbar">
                    <div className="logo">
                        <a href="\"><img src={guhuzalogo} alt="Guhuza Logo" /></a>
                    </div>
                    <div className="nav">
                        <ul >
                            <li><Link to="/">
                                Play</Link></li>
                            <li>
                                <Link to="/lb">Leaderboard</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;
