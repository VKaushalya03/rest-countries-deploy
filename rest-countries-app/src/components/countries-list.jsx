"use client"

import { useEffect, useState } from "react"
import CountryCard from "./country-card"
import { useSearchParams } from "react-router-dom"
import type { Country } from "../lib/types"

export default function CountriesList() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search")
  const regionFilter = searchParams.get("region")

  useEffect(() => {
    async function fetchCountries() {
      setLoading(true)
      setError(null)

      try {
        let url = "https://restcountries.com/v3.1/all"

        // If there's a search query, use the name endpoint
        if (searchQuery) {
          url = `https://restcountries.com/v3.1/name/${searchQuery}`
        }
        // If there's a region filter, use the region endpoint
        else if (regionFilter) {
          url = `https://restcountries.com/v3.1/region/${regionFilter}`
        }

        const response = await fetch(url)

        if (!response.ok) {
          if (response.status === 404) {
            setCountries([])
            setLoading(false)
            return
          }
          throw new Error("Failed to fetch countries")
        }

        const data = await response.json()
        setCountries(data)
      } catch (err) {
        console.error("Error fetching countries:", err)
        setError("Failed to load countries. Please try again later.")
        setCountries([])
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [searchQuery, regionFilter])

  if (loading) {
    return <div className="text-center py-8">Loading countries...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (countries.length === 0) {
    return <div className="text-center py-8">No countries found. Try adjusting your search or filters.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
}
