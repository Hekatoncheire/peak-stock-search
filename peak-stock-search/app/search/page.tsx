import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";

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
            <div className="group w-full flex flex-col items-center space-y-12">
                <div className="w-full flex justify-center z-10">
                    <SearchBar />
                </div>
                <div className="absolute sm:top-32 top-48 space-y-16 group-has-[:focus]:opacity-50 group-has-[:focus]:blur-sm w-4/5 flex flex-col items-center">
                    <h1 className="text-4xl mx-10 z-0 self-start">Welcome, future Investor!</h1>
                    <ul className="flex flex-col bg-white rounded-3xl py-4 self-start w-full">
                        <h1 className="px-11 font-bold text-darkBlue text-2xl mb-7">Top performing stocks</h1>
                        {topStocks.top_gainers.map((stock: any) => (
                            <div key={stock.ticker} className="flex p-4 bg-white border-b last:border-none">
                                <div className="w-1/5 px-8">{stock.ticker}</div>
                                <div className="w-1/5 px-8">${stock.price}</div>
                                <div className={`w-1/5 px-8 ${stock.change_amount.startsWith('-') ? 'text-red-500' : 'text-primaryGreen'}`}>
                                    {stock.change_amount}
                                </div>
                                <div className={`w-1/5 px-8 ${stock.change_percentage.startsWith('-') ? 'text-red-500' : 'text-primaryGreen'}`}>
                                    {stock.change_percentage}
                                </div>
                                <div className="w-1/5 px-8">{stock.volume}</div>
                            </div>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    );
}
