"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

export default function SearchFilters() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  // Create a function to update the URL with new search params
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params;
    },
    [searchParams]
  );

  const handleSearch = (e) => {
    e.preventDefault();

    // Update the URL with the search query
    const newParams = createQueryString("search", searchQuery);
    setSearchParams(newParams);
  };

  const handleRegionChange = (region) => {
    // Clear search when changing region
    setSearchQuery("");

    // Update the URL with the region filter
    const newParams = createQueryString("region", region);
    newParams.delete("search");
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <form onSubmit={handleSearch} className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for a country..."
          className="pl-10 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="flex gap-4">
        <Select
          onValueChange={handleRegionChange}
          value={searchParams.get("region") || ""}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="americas">Americas</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
          </SelectContent>
        </Select>

        {(searchParams.has("search") || searchParams.has("region")) && (
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
