import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/SignupPage.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:3001/api/signup", { username, password });
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
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}