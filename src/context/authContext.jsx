import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logoutUser } from "../services/api";

export const authContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setToken(savedToken);
      decodeUserId(savedToken);
    }
    setLoading(false);
  }, []);

  //decode access token to get id
  const decodeUserId = (accessToken) => {
    try {
      const decoded = jwtDecode(accessToken);
      setUserId(decoded.id || null); // adjust based on your JWT
    } catch (err) {
      console.error("Invalid token", err);
      setUserId(null);
    }
  };

  const login = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
    decodeUserId(accessToken);
  };

  const logout = async () => {
    try {
      await logoutUser(); // calling backend
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      setToken(null);
      setUserId(null);
    }
  };

  const isLoggedIn = !!token;

  return (
    <authContext.Provider value={{ token,userId, login, logout, isLoggedIn ,loading}}>
      {children}
    </authContext.Provider>
  );
};
