export default function StockDetails({ data, name }: { data: any, name: string }) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">{name} ({data.symbol})</h2>
          <p>Current Price: ${data.price}</p>
          <p>Open: ${data.open}</p>
          <p>High: ${data.high}</p>
          <p>Low: ${data.low}</p>
        </div>
      </div>
    );
  }
  