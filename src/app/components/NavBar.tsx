"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import { seeUserData } from "../../../helpers/helpers";

interface NavbarProps {
  collapsed: boolean;
  toggleNavbar: () => void;
}

const Navbar = ({ collapsed }: NavbarProps) => {
  const [profileImage, setProfileImage] = useState("/placeholder-black.png");
  const [user, setUser] = useState("Investor");
  const { darkMode } = useTheme();

  useEffect(() => {
    seeUserData(setProfileImage, setUser, darkMode);
  }, [darkMode]);

  return (
    <div
      className={`h-screen transition-all duration-300 bg-[var(--white)] text-[var(--black)] dark:bg-[var(--darkGrey)] dark:text-[var(--white)] p-0 flex flex-col
    ${collapsed ? "w-0 p-0 opacity-0 overflow-hidden" : "w-[30rem] p-4 opacity-100"}
  `}
    >
      <ul className="flex flex-col">
        <Image src="/stock-flow-blue.png" width={200} height={100} alt="Stock Flow Logo" />
      </ul>
      <ul className="flex flex-col mt-10 space-y-10 flex-grow font-bold">
        <li>
          <Link href="/">
            <h3>Home</h3>
          </Link>
        </li>
        <li>
          <a href="#">Retirement Calculator</a>
        </li>
        <li>
          <Link href="/rate-of-return">
            <h3>Rate of Return Calculator</h3>
          </Link>
        </li>
        <li>
          <a href="#">Stock Screener</a>
        </li>
        <li>
          <a href="#">Portfolio Tracker</a>
        </li>
      </ul>
      <ul>
        <div className="flex gap-2 max-[700px]:flex-col items-center">
          {profileImage && (
            <Image src={profileImage} alt="Profile Pic" width={50} height={50} className="rounded-2xl" />
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
