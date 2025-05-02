"use client";

import { useEffect, useState } from "react";
import CountryCard from "../components/country-card";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import { useFavorites } from "../hooks/use-favorites";
import { useUser } from "../context/user-context";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function FavoritesPage() {
  const { isLoggedIn } = useUser();
  const { favorites, clearFavorites } = useFavorites();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFavoriteCountries = async () => {
      if (favorites.length === 0) {
        setCountries([]);
        setLoading(false);
        return;
      }

      try {
        const countriesData = await Promise.all(
          favorites.map(async (code) => {
            const res = await fetch(
              `https://restcountries.com/v3.1/alpha/${code}`
            );
            if (!res.ok)
              throw new Error(`Failed to fetch country with code ${code}`);
            const data = await res.json();
            return data[0];
          })
        );
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching favorite countries:", error);
        toast({
          title: "Error",
          description: "Failed to fetch favorite countries",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteCountries();
  }, [favorites, toast]);

  const handleClearFavorites = () => {
    clearFavorites();
    toast({
      title: "Success",
      description: "All favorites have been cleared",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Favorites</h1>
        <p className="mb-6">Please log in to view your favorite countries.</p>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="inline-block">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Countries
          </Button>
        </Link>

        <h1 className="text-3xl font-bold">Your Favorite Countries</h1>

        <Button
          variant="destructive"
          onClick={handleClearFavorites}
          disabled={favorites.length === 0}
        >
          Clear All
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading your favorites...</div>
      ) : countries.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">
            You haven&apos;t added any countries to your favorites yet.
          </p>
          <Link to="/">
            <Button>Explore Countries</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </main>
  );
}
