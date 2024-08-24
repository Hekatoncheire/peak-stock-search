"use client";
import SideBar from '@/components/SideBar';
import { useFavourites } from '@/context/FavouritesContext';
import Link from 'next/link';

export default function FavouritesPage() {
    const { favourites, removeFavourite } = useFavourites();

    const handleRemove = (stock: any) => {
        console.log(stock)
        removeFavourite(stock.symbol)
    }

    return (
        <div className="bg-lightBlue flex sm:flex-row flex-col">
            <SideBar />
            <div className='w-full px-8 max-h-screen overflow-auto pb-8 pt-8'>
                <h1 className="text-3xl font-bold mb-6 text-center sm:text-left mx-8">Your Favourites</h1>
                {favourites.length === 0 ? (
                    <p className='text-xl text-center sm:text-left mx-8'>No favourite stocks yet. Go add some!</p>
                ) : (
                    <ul className="space-y-4 bg-white px-4 rounded-2xl">
                        {favourites.map((stock: any) => (
                            <li key={stock.symbol} className="bg-white sm:p-8 px-2 py-4 border-b flex justify-between items-center space-x-4">
                                <div className='space-y-4 text-darkBlue'>
                                    <Link href={`/stock/${stock.symbol}`} className="text-darkBlue font-bold hover:underline">
                                        {stock.name} ({stock.symbol})
                                    </Link>
                                    <p>Current Price: ${stock.close}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(stock)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    );
}
