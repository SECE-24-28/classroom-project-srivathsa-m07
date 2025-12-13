// src/context/AuthContext.jsx
import React, { useState, createContext } from "react";

// Create and export the context
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("rp_session");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (u, token) => {
    setUser(u);
    localStorage.setItem("rp_session", JSON.stringify(u));
    if(token) localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rp_session");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
