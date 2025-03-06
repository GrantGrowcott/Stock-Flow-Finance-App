"use client";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import { icons } from "@/constants";

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme(); 

  return (
    <button onClick={toggleDarkMode} className="ml-3 rounded-md">
      {darkMode ? (
        <Image src="/sun.png" width={icons.theme} height={icons.theme} alt="Sun Icon" />
      ) : (
        <Image src="/moon.png" width={icons.theme} height={icons.theme} alt="Moon Icon" />
      )}
    </button>
  );
}
