// src/context/authContext.jsx
import React, { useState, useEffect } from "react";

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

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  const isLoggedIn = !!token;

  return (
    <authContext.Provider value={{ token, login, logout, isLoggedIn }}>
      {children}
    </authContext.Provider>
  );
};
