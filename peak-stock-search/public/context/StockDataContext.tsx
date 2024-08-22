"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface StockDetails {
  symbol: string;
  price: string;
  open: string;
  high: string;
  low: string;
}

interface StockChartData {
  date: string;
  price: number;
}

interface StockDataContextType {
  stockDetailsCache: Record<string, StockDetails>;
  setStockDetailsCache: (symbol: string, data: StockDetails) => void;
  stockChartCache: Record<string, StockChartData[]>;
  setStockChartCache: (symbol: string, data: StockChartData[]) => void;
}

const StockDataContext = createContext<StockDataContextType | undefined>(undefined);

export const StockDataProvider = ({ children }: { children: ReactNode }) => {
  const [stockDetailsCache, setStockDetailsCacheState] = useState<Record<string, StockDetails>>({});
  const [stockChartCache, setStockChartCacheState] = useState<Record<string, StockChartData[]>>({});

  // Load the cache from localStorage when the component mounts
  useEffect(() => {
    const storedDetailsCache = localStorage.getItem("stockDetailsCache");
    const storedChartCache = localStorage.getItem("stockChartCache");

    if (storedDetailsCache) {
      setStockDetailsCacheState(JSON.parse(storedDetailsCache));
    }

    if (storedChartCache) {
      setStockChartCacheState(JSON.parse(storedChartCache));
    }
  }, []);

  // Save the stock details cache to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("stockDetailsCache", JSON.stringify(stockDetailsCache));
  }, [stockDetailsCache]);

  // Save the stock chart cache to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("stockChartCache", JSON.stringify(stockChartCache));
  }, [stockChartCache]);

  const setStockDetailsCache = (symbol: string, data: StockDetails) => {
    setStockDetailsCacheState((prevCache) => ({ ...prevCache, [symbol]: data }));
  };

  const setStockChartCache = (symbol: string, data: StockChartData[]) => {
    setStockChartCacheState((prevCache) => ({ ...prevCache, [symbol]: data }));
  };

  return (
    <StockDataContext.Provider value={{ stockDetailsCache, setStockDetailsCache, stockChartCache, setStockChartCache }}>
      {children}
    </StockDataContext.Provider>
  );
};

export const useStockData = () => {
  const context = useContext(StockDataContext);
  if (!context) {
    throw new Error("useStockData must be used within a StockDataProvider");
  }
  return context;
};
