import StockDetails from "@/components/StockDetails";
import StockChart from "@/components/StockChart";
import { fetchStockData, fetchStockName } from "@/utils/fetchStockDetails";
import { Stock } from "@/utils/types/Stock";
import SideBar from "@/components/SideBar";

export default async function StockDetailPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const fetchedStockName = await fetchStockName(encodeURIComponent(symbol)) as Stock
  const stockName = fetchedStockName?.name;

  // Fetch data server-side
  const stockData = await fetchStockData(symbol);

  if (!stockData) {
    return <p>Failed to load stock data.</p>;
  }

  return (
    <div className="w-screen h-full bg-lightBlue flex flex-col sm:flex-row">
      <SideBar />
      <div className="sm:w-full flex flex-col my-8 sm:mx-16 mx-4 max-h-screen overflow-auto">
        <StockDetails data={stockData[0]} name={stockName} symbol={symbol} />
        <StockChart data={stockData} />
      </div>
    </div>
  );
}
