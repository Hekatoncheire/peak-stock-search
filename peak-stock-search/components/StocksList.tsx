import Link from 'next/link'
import React from 'react'

function StocksList({ stockList, title }: { stockList: any, title: string }) {
    return (
        <ul className="flex flex-col bg-white rounded-3xl py-4 sm:self-start w-full">
            <h1 className="sm:px-11 px-6 font-bold text-darkBlue text-2xl mb-7 sm:self-start self-center">{title}</h1>
            {stockList.map((stock: any) => (
                <li key={stock.ticker}>
                    <Link  href={`/stock/${encodeURIComponent(stock.ticker)}`}>
                        <div className="flex p-4 bg-white border-b last:border-none flex-wrap text-darkBlue">
                            <div className="sm:w-1/5 w-1/3 pl-4 pr-8 sm:px-8">{stock.ticker}</div>
                            <div className="sm:w-1/5 w-1/3 px-8">${stock.price}</div>
                            <div className={`sm:w-1/5 w-1/3 hidden sm:block px-8 ${stock.change_amount.startsWith('-') ? 'text-red-500' : 'text-primaryGreen'}`}>
                                ${stock.change_amount}
                            </div>
                            <div className={`sm:w-1/5 w-1/3 px-8 pr-4 ${stock.change_percentage.startsWith('-') ? 'text-red-500' : 'text-primaryGreen'}`}>
                                {stock.change_percentage}
                            </div>
                            <div className="sm:w-1/5 w-1/3 sm:hidden lg:block px-8">{stock.volume}</div>
                        </div>
                    </Link>
                </li>

            ))}
        </ul>
    )
}

export default StocksList