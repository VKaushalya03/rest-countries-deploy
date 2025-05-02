"use client";

import type React from "react";

import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import type { Country } from "../lib/types";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/use-favorites";
import { useUser } from "../context/user-context";
import { cn } from "../lib/utils";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const { isLoggedIn } = useUser();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(country.cca3);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoggedIn) {
      toggleFavorite(country.cca3);
    }
  };

  return (
    <Link to={`/countries/${country.cca3}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <img
            src={country.flags.svg || "/placeholder.svg"}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="object-cover h-full w-full"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="font-bold text-xl mb-2 truncate">
            {country.name.common}
          </h2>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {country.population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital?.[0] || "N/A"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          {isLoggedIn && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className={cn(
                "rounded-full",
                isFavorite
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-red-400"
              )}
            >
              <Heart
                className={cn("h-5 w-5", isFavorite ? "fill-current" : "")}
              />
              <span className="sr-only">
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
