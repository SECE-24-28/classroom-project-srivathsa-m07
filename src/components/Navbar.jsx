// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar(){
  const { isLoggedIn, user, logout } = useContext(AuthContext || {});

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">RechargePro</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Home</Link>
            <Link to="/plans" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Plans</Link>
            {isLoggedIn && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Dashboard</Link>
                <Link to="/profile" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Profile</Link>
              </>
            )}
            
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-gray-700 hover:text-purple-600 font-medium px-3 py-2 transition-colors">Login</Link>
                <Link to="/signup" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md">Sign Up</Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg hover:bg-purple-100 transition-all">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{(user?.name || user?.email || 'U')[0].toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user?.name || user?.email}</span>
                </Link>
                <button onClick={logout} className="text-red-600 hover:text-red-700 font-medium px-3 py-2 transition-colors">Logout</button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
