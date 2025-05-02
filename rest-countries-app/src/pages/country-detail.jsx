"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function CountryDetailPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      if (!code) return;

      try {
        setLoading(true);
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

        if (!res.ok) {
          throw new Error("Failed to fetch country");
        }

        const data = await res.json();
        setCountry(data[0]);
      } catch (err) {
        console.error("Error fetching country:", err);
        setError("Failed to load country details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [code]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading country details...
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error || "Country not found"}
      </div>
    );
  }

  // Extract languages as an array
  const languages = country.languages ? Object.values(country.languages) : [];

  // Format population with commas
  const formattedPopulation = country.population.toLocaleString();

  // Get currencies
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => `${currency.name} (${currency.symbol})`)
        .join(", ")
    : "None";

  return (
    <main className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-block mb-8">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Countries
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img
            src={country.flags.svg || "/placeholder.svg"}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="rounded-md shadow-md w-full max-w-md object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-6">{country.name.common}</h1>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            <Card>
              <CardContent className="pt-6">
                <p>
                  <span className="font-semibold">Official Name:</span>{" "}
                  {country.name.official}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p>
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital ? country.capital.join(", ") : "None"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p>
                  <span className="font-semibold">Region:</span>{" "}
                  {country.region}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p>
                  <span className="font-semibold">Subregion:</span>{" "}
                  {country.subregion || "None"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p>
                  <span className="font-semibold">Population:</span>{" "}
                  {formattedPopulation}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p>
                  <span className="font-semibold">Area:</span>{" "}
                  {country.area.toLocaleString()} km²
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p>
                  <span className="font-semibold">Languages:</span>{" "}
                  {languages.length > 0 ? languages.join(", ") : "None"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p>
                  <span className="font-semibold">Currencies:</span>{" "}
                  {currencies}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p>
                  <span className="font-semibold">Borders:</span>{" "}
                  {country.borders ? country.borders.join(", ") : "None"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
