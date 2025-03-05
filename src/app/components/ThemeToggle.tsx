"use client";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme(); 

  return (
    <button onClick={toggleDarkMode} className="ml-3 rounded-md">
      {darkMode ? (
        <Image src="/sun.png" width={40} height={40} alt="Sun Icon" />
      ) : (
        <Image src="/moon.png" width={40} height={40} alt="Moon Icon" />
      )}
    </button>
  );
}
