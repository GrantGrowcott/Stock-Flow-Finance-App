"use client"
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import { ThemeProvider } from "./context/ThemeContext";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleNavbar = () => setCollapsed(prev => !prev);
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}  ${openSans.variable} antialiased`}>
        <ThemeProvider>
          <div className="flex">
          <Navbar collapsed={collapsed} toggleNavbar={toggleNavbar} />
          <SearchBar collapsed={collapsed} toggleNavbar={toggleNavbar} />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
