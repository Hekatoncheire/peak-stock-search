import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import StocksList from "@/components/StocksList";

async function fetchTopStocks() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/top-stocks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch top-performing stocks!")
        }

        const result = await response.json();
        return result
    } catch (error) {
        console.error(error)
    }
}

export default async function SearchPage() {
    const topStocks = JSON.parse(await fetchTopStocks())

    return (
        <div className="bg-lightBlue flex sm:flex-row flex-col justify-start">
            <SideBar />
            <div className="group sm:w-full flex flex-col items-center space-y-12 max-h-screen overflow-auto pb-8">
                <div className="w-full flex justify-center z-10">
                    <SearchBar />
                </div>
                <div className="group-has-[:focus]:fixed transition-opacity duration-1000 sm:top-20 top-48 space-y-12 group-has-[:focus]:opacity-50 group-has-[:focus]:blur-sm sm:group-has-[:focus]:w-5/6 w-full sm:px-16 px-4 flex flex-col items-center">
                    <h1 className="text-4xl sm:mx-10 z-0 self-start text-center text-darkBlue font-bold">Welcome to Investopia!</h1>
                    <h2 className="text-2xl sm:mx-10 z-0 self-start text-center sm:text-start text-darkBlue ">Scroll down to see the top-performing, worst-performing and most-actively traded stocks! Or just search any stock you want to explore! Enjoy</h2>
                    <StocksList stockList={topStocks.top_gainers} title={"Best performers"}/>
                    <StocksList stockList={topStocks.top_losers} title={"Worst performers"}/>
                    <StocksList stockList={topStocks.most_actively_traded} title={"Most traded"}/>
                    {/* <ul className="flex flex-col bg-white rounded-3xl py-4 sm:self-start w-full">
                        <h1 className="sm:px-11 px-6 font-bold text-darkBlue text-2xl mb-7 sm:self-start self-center">Top performing stocks</h1>
                        {topStocks.top_gainers.map((stock: any) => (
                            <div key={stock.ticker} className="flex p-4 bg-white border-b last:border-none flex-wrap">
                                <div className="sm:w-1/5 w-1/3 pl-4 pr-8 sm:px-8">{stock.ticker}</div>
                                <div className="sm:w-1/5 w-1/3 px-8">${stock.price}</div>
                                <div className={`sm:w-1/5 w-1/3 hidden sm:block px-8 ${stock.change_amount.startsWith('-') ? 'text-red-500' : 'text-primaryGreen'}`}>
                                    ${stock.change_amount}
                                </div>
                                <div className={`sm:w-1/5 w-1/3 px-8 ${stock.change_percentage.startsWith('-') ? 'text-red-500' : 'text-primaryGreen'}`}>
                                    {stock.change_percentage}
                                </div>
                                <div className="sm:w-1/5 w-1/3 hidden sm:block px-8">{stock.volume}</div>
                            </div>
                        ))}
                    </ul> */}
                </div>

            </div>

        </div>
    );
}
