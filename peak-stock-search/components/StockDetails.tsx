"use client"
import Card from '@/components/Card';
import { useFavourites } from '@/context/FavouritesContext';

export default function StockDetails({ data, name, symbol }: { data: any, name: string, symbol: string }) {
  const { addFavourite } = useFavourites();

  const handleAddFavourite = () => {
    addFavourite({ symbol: symbol, name, close: data.close });
    alert(`${name} (${symbol}) added to favourites!`)
  };

  const ratio = data.close / data.open
  const changePercentage = Math.abs(100 - ratio * 100).toFixed(2)

  return (
    <div className="flex flex-col gap-8 text-darkBlue">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center space-y-8 sm:space-y-0 pt-4 sm:px-8">
        <h1 className='font-bold text-3xl text-center sm:text-left'>{name} ({symbol})</h1>
        <button onClick={handleAddFavourite} className="h-1/2 w-1/2 sm:w-fit flex flex-row justify-center items-center bg-lightBlue text-darkBlue border-darkBlue border-2 md:py-8 py-4 px-4 rounded hover:opacity-75">
          <p>Add to Favourites</p>
        </button>
      </div>
      <div className='flex flex-wrap justify-center w-full'>
        <Card title="Current Price" className="w-full lg:w-1/5 mx-4 my-2 bg-darkBlue text-lightBlue space-y-4">
          <div className='flex flex-row justify-between'>
            <p className="text-lg">${data.close}</p>
          </div>
        </Card>
        <Card title="Open" className="w-full lg:w-1/5 mx-4 my-2 bg-darkBlue text-lightBlue space-y-4">
          <p className="text-lg">${data.open}</p>
        </Card>
        <Card title="High" className="w-full lg:w-1/5 mx-4 my-2 bg-darkBlue text-lightBlue space-y-4">
          <p className="text-lg">${data.high}</p>
        </Card>
        <Card title="Low" className="w-full lg:w-1/5 mx-4 my-2 bg-darkBlue text-lightBlue space-y-4">
          <p className="text-lg">${data.low}</p>
        </Card>
        <Card title="Change today" className="w-full lg:w-1/5  mx-4 my-2 bg-darkBlue text-lightBlue space-y-4">
          <p className={`${ratio < 1 ? 'text-red-500' : ratio == 1 ? 'text-lightBlue' : 'text-primaryGreen'} text-lg`}>{data.close / data.open < 1 ? "-" : data.close / data.open == 1 ? "" : "+"}{changePercentage}%</p>
        </Card>
      </div>
    </div>
  );
}

