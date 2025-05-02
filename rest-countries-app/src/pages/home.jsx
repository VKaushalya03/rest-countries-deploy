import { Suspense } from "react";
import CountriesList from "../components/countries-list";
import SearchFilters from "../components/search-filters";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        REST Countries Explorer
      </h1>
      <SearchFilters />
      <Suspense
        fallback={<div className="text-center mt-8">Loading countries...</div>}
      >
        <CountriesList />
      </Suspense>
    </main>
  );
}
