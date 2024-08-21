"use client";
import { useState, useEffect, useCallback } from "react";

type Stock = {
  symbol: string;
  name: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Stock[]>([]);
  const [cache, setCache] = useState<Record<string, Stock[]>>({}); // Cache to store search results
  const [isLoading, setIsLoading] = useState(false);

  // Debouncing function to delay API calls
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Function to fetch suggestions
  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]); // Clear suggestions for short queries
      return;
    }

    if (cache[query]) {
      // Use cached results if available
      setSuggestions(cache[query]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/stocks?query=${query}`);
      const data = await response.json();
      setSuggestions(data);
      setCache((prevCache) => ({ ...prevCache, [query]: data })); // Cache the result
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce the fetchSuggestions function to reduce API calls
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), [cache]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchSuggestions(value); // Trigger debounced search
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="border rounded w-full p-2"
        placeholder="Enter stock symbol or name"
      />
      {isLoading && <p>Loading...</p>}
      <ul className="mt-4">
        {suggestions.map((stock) => (
          <li key={stock.symbol} className="p-2 border-b">
            {stock.name} ({stock.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
}
