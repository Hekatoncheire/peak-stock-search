"use client";
import Image from "next/image";
import Link from "next/link";
import logo from '@/public/investopia_light.png'


export default function SideBar() {
  return (
    <div className="sm:h-screen h-fit sm:w-64 bg-darkBlue text-lightBlue flex sm:flex-col flex-row items-center justify-around sm:justify-start border-transparent">
      {/* Logo */}
      <div className="mx-4 sm:mx-0">
        <Image src={logo} alt="Logo" width={200} height={200} />
      </div>
      {/* Navigation Links */}
      <nav className="flex sm:flex-col flex-row sm:items-start justify-around w-full h-full sm:h-fit border-transparent">
        <Link href="/" className="w-full h-full sm:h-fit text-lg font-semibold hover:bg-lightBlue hover:text-darkBlue sm:px-6 px-2 py-2 sm:rounded-none rounded-md text-center sm:text-start">
          Home
        </Link>
        <Link href="/favorites" className="w-full h-full sm:h-fit text-lg font-semibold hover:bg-lightBlue hover:text-darkBlue sm:px-6 px-2 py-2 sm:rounded-none rounded-md text-center sm:text-start">
          Favorites
        </Link>
      </nav>
    </div>
  );
}
