"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import { seeUserData } from "../../../helpers/helpers";
import { icons, NavbarProps } from "@/constants";

const Navbar = ({ collapsed }: NavbarProps) => {
  const [profileImage, setProfileImage] = useState("/placeholder-black.png");
  const [user, setUser] = useState("Investor");
  const { darkMode } = useTheme();

  useEffect(() => {
    seeUserData(setProfileImage, setUser, darkMode);
  }, [darkMode]);

  return (
    <div
      className={`h-screen transition-all duration-icons.nav0 bg-[var(--white)] text-[var(--black)] dark:bg-[var(--darkGrey)] dark:text-[var(--white)] p-0 flex flex-col
  ${collapsed ? "w-0 p-0 opacity-0 overflow-hidden" : "w-[30rem] p-4 opacity-100 max-[800px]:w-[5rem]"}
`}
    >
      <ul className="flex flex-col">
        <Image
          src="/stock-flow-blue.png"
          width={icons.logoWidth}
          height={icons.logoHeight}
          alt="Stock Flow Logo"
          className="max-[800px]:hidden"
        />
      </ul>
      <ul className={` ${collapsed ? "mt-10" : "mt-20 flex flex-col  space-y-20 flex-grow font-bold text-xl"} `}>
        <li>
          <Link href="/" className="flex items-center gap-3 ">
            <Image
              src={darkMode ? "/home-white.png" : "/home-black.png"}
              width={icons.nav}
              height={icons.nav}
              alt="home"
            />
            <h3 className="max-[800px]:hidden">Home</h3>
          </Link>
        </li>
        <li>
          <Link href="/retirement-calculator" className="flex items-center gap-3">
            <Image
              src={darkMode ? "/calculator-white.png" : "/calculator-black.png"}
              width={icons.nav}
              height={icons.nav}
              alt="calculator"
            />
            <h3 className="max-[800px]:hidden">Retirement Calculator</h3>
          </Link>
        </li>
        <li>
          <Link href="/rate-of-return" className="flex items-center gap-3">
            <Image
              src={darkMode ? "/rate-white.png" : "/rate-black.png"}
              width={icons.nav}
              height={icons.nav}
              alt="rate of return"
            />
            <h3 className="max-[800px]:hidden">Rate of Return Calculator</h3>
          </Link>
        </li>
        <li>
          <Link href="/stock-screener" className="flex items-center gap-3">
            <Image
              src={darkMode ? "/filter-white.png" : "/filter-black.png"}
              width={icons.nav}
              height={icons.nav}
              alt="stock screener"
            />
            <h3 className="max-[800px]:hidden">Stock Screener</h3>
          </Link>
        </li>
        <li>
          <Link href="/portfolio-tracker" className="flex items-center gap-3">
            <Image
              src={darkMode ? "/portfolio-white.png" : "/portfolio-black.png"}
              width={icons.nav}
              height={icons.nav}
              alt="portfolio"
            />
            <h3 className="max-[800px]:hidden">Portfolio Tracker</h3>
          </Link>
        </li>
      </ul>
      <ul>
        <div className="flex gap-2 max-[700px]:flex-col items-center">
          {profileImage && (
            <Image
              src={profileImage}
              alt="Profile Pic"
              width={icons.profile}
              height={icons.profile}
              className="rounded-2xl"
            />
          )}
          <div className="flex items-center justify-center">
            <h3 className="font-bold max-[800px]:hidden ">{user}</h3>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
