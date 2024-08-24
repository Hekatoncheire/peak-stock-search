import Card from '@/components/Card';

export default function StockDetails({ data, name, symbol }: { data: any, name: string, symbol: string }) {
  const ratio = data.close / data.open
  const changePercentage = Math.abs(100 - ratio * 100).toFixed(2)
  return (
    <div className="flex flex-col gap-8 text-darkBlue">
      <h1 className='font-bold text-3xl text-center sm:text-left'>{name} ({symbol})</h1>
      <div className='flex flex-wrap justify-center w-full'>
        <Card title="Current Price" className="w-full sm:w-1/6 mx-4 my-2 bg-darkBlue text-lightBlue space-y-4">
          <div className='flex flex-row justify-between'>
            <p className="text-lg">${data.close}</p>
          </div>
        </Card>
        <Card title="Open" className="w-full sm:w-1/6 mx-4 my-2 bg-darkBlue text-lightBlue space-y-4">
          <p className="text-lg">${data.open}</p>
        </Card>
        <Card title="High" className="w-full sm:w-1/6 mx-4 my-2 bg-darkBlue text-lightBlue space-y-4">
          <p className="text-lg">${data.high}</p>
        </Card>
        <Card title="Low" className="w-full sm:w-1/6 mx-4 my-2 bg-darkBlue text-lightBlue space-y-4">
          <p className="text-lg">${data.low}</p>
        </Card>
        <Card title="Change today" className="w-full sm:w-1/6 mx-4 my-2 bg-darkBlue text-lightBlue space-y-4">
          <p className={`${ratio < 1 ? 'text-red-500' : ratio == 1 ? 'text-lightBlue' : 'text-primaryGreen'} text-lg`}>{data.close / data.open < 1 ? "-" : data.close / data.open == 1 ? "" : "+"}{changePercentage}%</p>
        </Card>
      </div>
    </div>
  );
}

