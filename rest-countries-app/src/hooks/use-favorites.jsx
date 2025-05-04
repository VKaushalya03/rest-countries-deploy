import { useEffect, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/favorites", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      setFavorites(data);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const toggleFavorite = async (code) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/favorites/toggle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      const data = await res.json();
      setFavorites(data);
    }
  };

  const clearFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/favorites/clear", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setFavorites([]);
    }
  };

  return { favorites, toggleFavorite, clearFavorites };
}
