import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import StocksList from "@/components/StocksList";
import { fetchTopStocks } from "@/utils/fetchStockDetails";



export default async function SearchPage() {
    const topStocks = await fetchTopStocks()

    return (
        <div className="bg-lightBlue flex sm:flex-row flex-col justify-start">
            <SideBar />
            <div className="group sm:w-full flex flex-col items-center space-y-12 max-h-screen overflow-auto pb-8">
                <div className="w-full flex justify-center z-10">
                    <SearchBar />
                </div>
                <div className="group-[:focus-within]:blur-sm transition-opacity duration-1000 space-y-12 group-has-[:focus]:opacity-50 group-has-[:focus]:blur-sm  w-full sm:px-16 px-4 flex flex-col items-center">
                    <h1 className="text-4xl sm:mx-10 z-0 self-start text-center text-darkBlue font-bold">Welcome to Investopia!</h1>
                    <h2 className="text-2xl sm:mx-10 z-0 self-start text-center sm:text-start text-darkBlue ">Scroll down to see the top-performing and most-actively traded stocks! Or just search any stock you want to explore! Enjoy</h2>
                    <StocksList stockList={topStocks.top_gainers} title={"Best performers"} />
                    {/* <StocksList stockList={topStocks.top_losers} title={"Worst performers"}/> */}
                    <StocksList stockList={topStocks.most_actively_traded} title={"Most traded"} />
                </div>

            </div>

        </div>
    );
}
