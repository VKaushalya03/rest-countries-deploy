"use client";

import { useEffect, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (countryCode) => {
    setFavorites((prev) => {
      if (prev.includes(countryCode)) {
        return prev.filter((code) => code !== countryCode);
      } else {
        return [...prev, countryCode];
      }
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return { favorites, toggleFavorite, clearFavorites };
}
