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
    ${collapsed ? "w-0 p-0 opacity-0 overflow-hidden" : "w-[30rem] p-4 opacity-100"}
  `}
    >
      <ul className="flex flex-col">
        <Image src="/stock-flow-blue.png" width={icons.logoWidth} height={icons.logoHeight} alt="Stock Flow Logo" />
      </ul>
      <ul className="flex flex-col mt-10 space-y-20 flex-grow font-bold text-xl">
        <li>
          <Link href="/" className="flex items-center gap-3">
            <Image src={darkMode ? "/home-white.png" : "/home-black.png"} width={icons.nav} height={icons.nav} alt="home" />
            <h3>Home</h3>
          </Link>
        </li>
        <li>
          <Link href="/" className="flex items-center gap-3">
            <Image src={darkMode ? "/calculator-white.png" : "/calculator-black.png"} width={icons.nav} height={icons.nav} alt="home" />
            <h3>Retirement Calculator</h3>
          </Link>
        </li>
        <li>
          <Link href="/rate-of-return" className="flex items-center gap-3">
            <Image src={darkMode ? "/rate-white.png" : "/rate-black.png"} width={icons.nav} height={icons.nav} alt="home" />
            <h3>Rate of Return Calculator</h3>
          </Link>
        </li>
        <li>
          <Link href="/stock-screener" className="flex items-center gap-3">
            <Image src={darkMode ? "/filter-white.png" : "/filter-black.png"} width={icons.nav} height={icons.nav} alt="home" />
            <h3>Stock Screener</h3>
          </Link>
        </li>
        <li>
          <Link href="/" className="flex items-center gap-3">
            <Image src={darkMode ? "/portfolio-white.png" : "/portfolio-black.png"} width={icons.nav} height={icons.nav} alt="home" />
            <h3>Portfolio Tracker</h3>
          </Link>
        </li>
      </ul>
      <ul>
        <div className="flex gap-2 max-[700px]:flex-col items-center">
          {profileImage && (
            <Image src={profileImage} alt="Profile Pic" width={icons.profile} height={icons.profile} className="rounded-2xl" />
          )}
          <div className="flex items-center justify-center">
            <h3 className="font-bold">{user}</h3>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
