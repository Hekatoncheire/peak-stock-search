import StockDetails from "@/components/StockDetails";
import StockChart from "@/components/StockChart";
import { fetchStockChartData, fetchStockDetails } from "@/utils/fetchStockDetails";

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
