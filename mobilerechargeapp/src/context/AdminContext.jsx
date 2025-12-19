import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    
    if (token && adminData) {
      setAdmin(JSON.parse(adminData));
      setIsAdminLoggedIn(true);
    }
  }, []);

  const adminLogin = (adminData, token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminData', JSON.stringify(adminData));
    setAdmin(adminData);
    setIsAdminLoggedIn(true);
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdmin(null);
    setIsAdminLoggedIn(false);
  };

  return (
    <AdminContext.Provider value={{ admin, isAdminLoggedIn, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
}
