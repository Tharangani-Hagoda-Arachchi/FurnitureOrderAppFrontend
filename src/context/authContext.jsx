// src/context/authContext.jsx
import React, { useState, useEffect } from "react";
import { loginUser, logoutUser } from "../services/api";

export const authContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) setToken(savedToken);
  }, []);

  const login = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
  };

const logout = async () => {
    try {
      await logoutUser(); // calling backend
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      setToken(null);
    }
  };

  const isLoggedIn = !!token;

  return (
    <authContext.Provider value={{ token, login, logout, isLoggedIn }}>
      {children}
    </authContext.Provider>
  );
};
