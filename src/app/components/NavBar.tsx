"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import { seeUserData } from "../../../helpers/helpers";
import { icons, NavbarProps } from "@/constants";
import { usePathname } from "next/navigation";

const Navbar = ({ collapsed }: NavbarProps) => {
  const pathname = usePathname();
  const [profileImage, setProfileImage] = useState("/placeholder-black.png");
  const [user, setUser] = useState("Investor");
  const { darkMode } = useTheme();

  useEffect(() => {
    seeUserData(setProfileImage, setUser, darkMode);
  }, [darkMode]);

  return (
    <div
      className={`h-screen transition-all duration-200 bg-[var(--white)] text-[var(--black)] dark:bg-[var(--darkGrey)] dark:text-[var(--white)] p-0 flex flex-col
  ${collapsed ? "w-0 p-0 opacity-0 overflow-hidden" : "w-[30rem] p-4 opacity-100 max-[800px]:w-[5rem]"}`}
    >
      <ul className="flex flex-col">
        <Image
          src="/stock-flow-blue.png"
          width={icons.logoWidth}
          height={icons.logoHeight}
          alt="Stock Flow Logo"
          priority={true}
          className="max-[800px]:hidden"
        />
      </ul>
      <ul className={` ${collapsed ? "mt-10" : "mt-20 flex flex-col space-y-20 flex-grow font-bold text-xl"}`}>
        {[
          { href: "/", icon: "home", label: "Home" },
          { href: "/retirement-calculator", icon: "calculator", label: "Retirement Calculator" },
          { href: "/rate-of-return", icon: "rate", label: "Rate of Return Calculator" },
          { href: "/stock-screener", icon: "filter", label: "Stock Screener" },
          { href: "/portfolio-tracker", icon: "portfolio", label: "Portfolio Tracker" },
        ].map(({ href, icon, label }) => (
          <li
            key={href}
            className={`flex items-center gap-3 rounded-md transition-colors duration-200 
              ${
                pathname === href
                  ? "bg-[var(--grey)] py-2 px-2 dark:bg-[var(--blue)]"
                  : "hover:bg-[var(--grey)] dark:hover:bg-[var(--blue)] py-2 px-2"
              }`}
          >
            <Link href={href} className="flex items-center gap-3 w-full h-full">
              <Image
                src={darkMode ? `/${icon}-white.png` : `/${icon}-black.png`}
                width={icons.nav}
                height={icons.nav}
                alt={label}
              />
              <h3 className="max-[800px]:hidden">{label}</h3>
            </Link>
          </li>
        ))}
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
            <h3 className="font-bold max-[800px]:hidden">{user}</h3>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
