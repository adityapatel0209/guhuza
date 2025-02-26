import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Authenticate({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (!username || !password) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
}