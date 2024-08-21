"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StockDetails from "@/components/StockDetails";
import StockChart from "@/components/StockChart";

export default function StockDetailPage({ params }: { params: { symbol: string } }) {
  const [stockData, setStockData] = useState(null);
  const { symbol } = params;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/stocks/${symbol}`);
      setStockData(response.data);
    };
    fetchData();
  }, [symbol]);

  return (
    <div className="container mx-auto p-6">
      {stockData ? (
        <>
          <StockDetails data={stockData} />
          <StockChart symbol={symbol} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
