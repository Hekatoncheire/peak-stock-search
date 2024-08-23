import StockDetails from "@/components/StockDetails";
import StockChart from "@/components/StockChart";
import axios from "axios";

// Fetch stock details server-side
async function fetchStockDetails(symbol: string) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stocks/${symbol}`);
   
    return response.data;
  } catch (error) {
    console.error("Failed to fetch stock details:", error);
    return null;
  }
}

// Fetch stock chart data server-side
async function fetchStockChartData(symbol: string) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stocks/${symbol}/chart`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch stock chart data:", error);
    return null;
  }
}

export default async function StockDetailPage({ params, searchParams }: { params: { symbol: string }, searchParams: { name?: string } }) {
  const { symbol } = params;
  const stockName = searchParams.name;

  // Fetch data server-side
  const stockData = await fetchStockDetails(symbol);
  const chartData = await fetchStockChartData(symbol);

  if (!stockData || !chartData) {
    return <p>Failed to load stock data.</p>;
  }

  return (
    <div className="w-full p-6 h-full bg-lightBlue">
      <StockDetails data={stockData} name={stockName!} />
      <StockChart data={chartData} />
    </div>
  );
}
