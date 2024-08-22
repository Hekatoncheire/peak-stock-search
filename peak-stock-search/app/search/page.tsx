"use client";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import logo from '@/public/investopia.png'

export default function SearchPage() {

    return (
        <div className="p-6 bg-lightBlue flex flex-row sm:justify-center items-center ">
            <Image src={logo} alt={"logo"} height={100}></Image>
            <h1 className="mr-8 text-darkBlue font-bold text-2xl sm:block hidden">Investopia</h1>
            <SearchBar  />
        </div>
    );
}
