import Card from '@/components/Card';

export default function StockDetails({ data, name }: { data: any, name: string }) {
  return (
    <div className="flex flex-col gap-4 text-darkBlue">
      <h1>{name}</h1>
      <div className='flex flex-wrap space-x-4'>
        <Card title="Current Price" className="w-full md:w-1/3">
          <p className="text-lg">${data.close}</p>
        </Card>

        <Card title="Open" className="w-full md:w-1/3">
          <p className="text-lg">${data.open}</p>
        </Card>

        <Card title="High" className="w-full md:w-1/3">
          <p className="text-lg">${data.high}</p>
        </Card>

        <Card title="Low" className="w-full md:w-1/3">
          <p className="text-lg">${data.low}</p>
        </Card>
      </div>
    </div>
  );
}

