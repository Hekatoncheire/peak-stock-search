"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { Stock } from "@/utils/types/Stock";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Stock[]>();
    const [cache, setCache] = useState<Record<string, Stock[]>>({}); // Cache to store search results

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

        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            setSuggestions(data);
            setCache((prevCache) => ({ ...prevCache, [query]: data })); // Cache the result
        } catch (error) {
            console.error("Failed to fetch suggestions:", error);
        }
    };

    // Debounce the fetchSuggestions function to reduce API calls
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 1000), [cache]);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        debouncedFetchSuggestions(value); // Trigger debounced search
    };

    return (
        <div className="sm:w-1/2 w-full px-8 mt-8 z-10 text-darkBlue">
            <div className="peer flex flex-row items-center bg-white border sm:rounded-3xl has-[:focus]:border-secondaryGreen has-[:focus]:border-2 rounded-md">
                <div className="pl-3 flex flex-row items-center">
                    <Search size={18} className="text-darkBlue" />
                </div>
                <input autoComplete="off" className="placeholder:italic placeholder:text-darkBlue bg-transparent w-11/12 py-2 pl-4 pr-2 sm:text-lg focus:outline-none text-darkBlue" placeholder="Enter stock symbol or name" type="text" name="search" value={query} onChange={handleChange} />
            </div>
            <ul className="peer-focus-within:fixed peer-focus-within:w-1/3 peer-focus-within:mx-8 mt-1 bg-white w-full sm:rounded-3xl rounded-md sm:max-h-screen max-h-80 overflow-y-auto shadow-sm peer-[&:not(:focus-within)]:hidden" hidden={suggestions === undefined}>
                {suggestions !== undefined ? (suggestions?.map((stock) => (
                    <li key={stock.symbol} className="p-2 border-b py-4 px-4">
                        <Link href={`/stock/${stock.symbol}`}>
                            {stock.name} ({stock.symbol})
                        </Link>
                    </li>
                ))) : <p>API request limit reached!</p>}

            </ul>
        </div>
    );
}
