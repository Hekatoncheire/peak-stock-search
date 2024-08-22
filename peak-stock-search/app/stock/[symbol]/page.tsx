"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import StockDetails from "@/components/StockDetails";
import StockChart from "@/components/StockChart";
import { useStockData } from "@/public/context/StockDataContext";

export default function StockDetailPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const { stockDetailsCache, setStockDetailsCache, stockChartCache, setStockChartCache } = useStockData();
  const [stockData, setStockData] = useState(stockDetailsCache[symbol] || null);
  const [chartData, setChartData] = useState(stockChartCache[symbol] || null);

  useEffect(() => {
    if (!stockData) {
      const fetchStockDetails = async () => {
        try {
          const response = await axios.get(`/api/stocks/${symbol}`);
          setStockDetailsCache(symbol, response.data);
          setStockData(response.data);
        } catch (error) {
          console.error("Failed to fetch stock details:", error);
        }
      };
      fetchStockDetails();
    }
  }, [symbol, stockData, setStockDetailsCache]);

  useEffect(() => {
    if (!chartData) {
      const fetchChartData = async () => {
        try {
          const response = await axios.get(`/api/stocks/${symbol}/chart`);
          setStockChartCache(symbol, response.data);
          setChartData(response.data);
        } catch (error) {
          console.error("Failed to fetch chart data:", error);
        }
      };
      fetchChartData();
    }
  }, [symbol, chartData, setStockChartCache]);

  if (!stockData || !chartData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <StockDetails data={stockData} />
      <StockChart data={chartData} />
    </div>
  );
}
