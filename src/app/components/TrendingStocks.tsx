import { useEffect, useState } from "react";
import { getStockData } from "../api/api";
import { Stock } from "@/constants";

const TrendingStocks = () => {
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [activeData, setActiveData] = useState<string>("Active");

  useEffect(() => {
    getStockData(setStockData, setActiveData, "Active");
  }, []);

  return (
    <div
      className="flex-1  bg-[var(--white)] dark:bg-[var(--darkGrey)] border rounded-lg shadow-lg p-3 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 2rem - 8rem)", boxSizing: "border-box" }}
    >
      <div className="flex flex-1">
        <button
          onClick={() => getStockData(setStockData, setActiveData, "Active")}
          className={`py-3 flex-1 font-bold ${activeData === "Active" ? "text-[var(--blue)] underline hover:bg-[var(--lightBlue)]" : ""}`}
        >
          Most Active
        </button>
        <button
          onClick={() => getStockData(setStockData, setActiveData, "Gainers")}
          className={`py-3 flex-1 font-bold ${activeData === "Gainers" ? "text-[var(--blue)] underline hover:bg-[var(--lightBlue)]" : ""}`}
        >
          <h3 className="font-bold">Gainers</h3>
        </button>
        <button
          onClick={() => getStockData(setStockData, setActiveData, "Losers")}
          className={`py-3 flex-1 font-bold ${activeData === "Losers" ? "text-[var(--blue)] underline hover:bg-[var(--lightBlue)]" : ""}`}
        >
          <h3 className="font-bold">Losers</h3>
        </button>
      </div>
      
      
      <div className="mx-auto w-full overflow-y-auto" style={{ maxHeight: "calc(100vh - 2rem - 8rem)", boxSizing: "border-box" }}>
        <div className="grid grid-cols-4 gap-4 text-center">
          <h3 className="font-bold">Symbol</h3>
          <h3 className="font-bold">Change</h3>
          <h3 className="font-bold">Price</h3>
          <h3 className="font-bold">% Change</h3>
        </div>
        {stockData.length > 0 ? (
          stockData.map((stock, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mt-3 text-center">
              <p>{stock.symbol}</p>
              <p>{stock.change}</p>
              <p>{stock.price}</p>
              <p>{stock.changesPercentage.toFixed(2)}%</p>
            </div>
          ))
        ) : (
          <p>No stock data available</p>
        )}
      </div>
    </div>
  );
};

export default TrendingStocks;
