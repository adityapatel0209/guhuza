import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/LoginPage.css";

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

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:3001/api/signup", { username, password });
      handleLogin();
    } catch (err) {
      setError("Error during signup");
      toast.error("Error during signup");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
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
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}