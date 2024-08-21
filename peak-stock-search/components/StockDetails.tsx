export default function StockDetails({ data }: { data: any }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">{data.name} ({data.symbol})</h2>
          <p>Current Price: ${data.price}</p>
          <p>Open: ${data.open}</p>
          <p>High: ${data.high}</p>
          <p>Low: ${data.low}</p>
        </div>
      </div>
    );
  }
  