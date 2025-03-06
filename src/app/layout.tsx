"use client";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import AuthWrapper from "./components/AuthWrapper";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./store";

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
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} antialiased`}>
          <ThemeProvider>
            <AuthWrapper>{children}</AuthWrapper> 
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  );
}
