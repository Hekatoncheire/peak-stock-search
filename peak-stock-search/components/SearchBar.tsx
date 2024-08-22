"use client";
import Link from "next/link";
import { useState, useCallback } from "react";
import { Search } from "lucide-react";

type Stock = {
    symbol: string;
    name: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Stock[] | undefined>(undefined);
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
        <div className="sm:w-1/2 w-full flex flex-col">
            <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search size={16} className="text-darkBlue"/>
                </span>
                <input className="placeholder:italic placeholder:text-darkBlue block bg-white w-full border rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-secondaryGreen focus:ring-secondaryGreen focus:ring-1 sm:text-sm" placeholder="Enter stock symbol or name" type="text" name="search" value={query} onChange={handleChange}/>
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            </div>
            {/* <input
                type="text"
                value={query}
                onChange={handleChange}
                className="border rounded-md text-base p-2 focus:border-darkBlue focus:shadow focus:border-2 outline-none placeholder:text-darkBlue"
                
            /> */}
            {isLoading ? <p>Loading...</p> : null}
            {suggestions !== undefined ? <ul>
                {suggestions?.map((stock) => (
                    <li key={stock.symbol} className="p-2 border-b">
                        <Link href={`/stock/${stock.symbol}`}>
                            {stock.name} ({stock.symbol})
                        </Link>
                    </li>
                ))}
            </ul> : null}

        </div>
    );
}
