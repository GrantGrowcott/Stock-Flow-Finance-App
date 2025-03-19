"use client";
import IndexWidget from "./components/NewsWidget";
import TrendingStocks from "./components/TrendingStocks";

function HomePage() {
  return (
    <div className="flex content-center justify-center p-7 gap-5 max-[900px]:flex-col" >
      <IndexWidget />
      <TrendingStocks />
    </div>
  );
}

export default HomePage;
