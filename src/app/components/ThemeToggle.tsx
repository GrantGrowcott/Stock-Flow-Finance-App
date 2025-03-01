"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Define a type for the props
interface ThemeToggleProps {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ThemeToggle({ setDarkMode }: ThemeToggleProps) {
  const [darkMode, setLocalDarkMode] = useState(false);

  // When darkMode changes, update the global dark mode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setDarkMode(darkMode);
  }, [darkMode, setDarkMode]);

  return (
    <button onClick={() => setLocalDarkMode(!darkMode)} className="p-2 rounded-md">
      {darkMode ? (
        <Image src="/sun.png" width={50} height={50} alt="sun outline" />
      ) : (
        <Image src="/moon.png" width={50} height={50} alt="moon outline" />
      )}
    </button>
  );
}
