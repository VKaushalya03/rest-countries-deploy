"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({
  isLoggedIn: false,
  userEmail: null,
  login: () => {},
  logout: () => {},
});

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  // Load user session from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setIsLoggedIn(true);
      setUserEmail(storedEmail);
    }
  }, []);

  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    localStorage.removeItem("userEmail");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
