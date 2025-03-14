"use client";
import IndexWidget from "./components/NewsWidget";
import TrendingStocks from "./components/TrendingStocks";

function HomePage() {
  return (
    <div className="flex items-center justify-center p-7 ">
      <IndexWidget />
      <TrendingStocks />
    </div>
  );
}

export default HomePage;
