"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Error from "next/error";

export default function SearchPage() {
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query: string) => {
        if (query.length < 3) return;
        try {
            const response = await axios.get(`/api/stocks?query=${query}`);
            if (response.status!=500) {
                setSuggestions(response.data);
            }
            else {
                throw new Error({statusCode: response.status, title: response.statusText})
            }
        } catch (error) {
            console.log(error)
        }


    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Search Stocks</h1>
            <SearchBar  />
            <ul className="mt-4">
                {suggestions.map((stock: any) => (
                    <li key={stock.symbol} className="p-2 border-b">
                        <Link href={`/stock/${stock.symbol}`}>
                            {stock.name} ({stock.symbol})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
