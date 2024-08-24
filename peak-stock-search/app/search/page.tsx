"use client";

import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import StocksList from "@/components/StocksList";
import { useState, useEffect } from "react";

interface TopStocksData {
  top_gainers: any[];
  top_losers: any[];
  most_actively_traded: any[];
}

export default function SearchPage() {
  const [topStocks, setTopStocks] = useState<TopStocksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopStocks();
  }, []);

  async function fetchTopStocks() {
    try {
      const response = await fetch(`/api/top-stocks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch top-performing stocks!");
      }

      const result = await response.json();
      setTopStocks(result);
      setLoading(false);
    } catch (error) {
      setError("An error occurred while fetching top-performing stocks.");
      console.error(error);
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading top-performing stocks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-lightBlue flex sm:flex-row flex-col justify-start">
      <SideBar />
      <div className="group sm:w-full flex flex-col items-center space-y-12 max-h-screen overflow-auto pb-8">
        <div className="w-full flex justify-center z-10">
          <SearchBar />
        </div>
        <div className="group-[:focus-within]:blur-sm transition-opacity duration-1000 space-y-12 group-has-[:focus]:opacity-50 group-has-[:focus]:blur-sm w-full sm:px-16 px-4 flex flex-col items-center">
          <h1 className="text-4xl sm:mx-10 z-0 self-start text-center text-darkBlue font-bold">
            Welcome to Investopia!
          </h1>
          <h2 className="text-2xl sm:mx-10 z-0 self-start text-center sm:text-start text-darkBlue">
            Scroll down to see the top-performing and most-actively traded stocks! Or just search any stock you want to explore! Enjoy
          </h2>
          <StocksList stockList={topStocks?.top_gainers} title={"Best performers"} />
          <StocksList stockList={topStocks?.most_actively_traded} title={"Most traded"} />
        </div>
      </div>
    </div>
  );
}
