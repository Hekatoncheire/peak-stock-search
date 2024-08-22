import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function SearchPage() {

    return (
        <div className="bg-lightBlue flex sm:flex-row flex-col justify-start">
            <SideBar />
            <div className="w-full flex flex-col items-start space-y-12">
                <div className="w-full flex justify-center">
                    <SearchBar />
                </div>
                <h1 className="text-4xl mx-12">Welcome, future Investor!</h1>
            </div>

        </div>
    );
}
