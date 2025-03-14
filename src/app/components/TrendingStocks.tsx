import { useEffect, useState } from "react";
import { getStockData } from "../../../helpers/helpers";
import { Stock } from "@/constants";

const TrendingStocks = () => {
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [activeData, setActiveData] = useState<string>("Active");

  useEffect(() => {
    getStockData(setStockData, setActiveData, "Active");
  }, []);

  return (
    <div className="flex-1 self-start overflow-y-auto max-h-[87vh] bg-[var(--white)] dark:bg-[var(--darkGrey)] rounded-lg shadow-lg p-4">
      <div className="flex flex-1  mb-3">
        <button
          onClick={() => getStockData(setStockData, setActiveData, "Active")}
          className={`py-3 flex-1 font-bold ${activeData === "Active" ? "text-[var(--blue)] underline hover:bg-[var(--lightBlue)]" : ""}`}
        >
          Most Active
        </button>
        <button onClick={() => getStockData(setStockData, setActiveData, "Gainers")} className={`py-3 flex-1 font-bold ${activeData === "Gainers" ? "text-[var(--blue)] underline hover:bg-[var(--lightBlue)]" : ""}`}>
          <h3 className="font-bold">Gainers</h3>
        </button>
        <button onClick={() => getStockData(setStockData, setActiveData, "Losers")} className={`py-3 flex-1 font-bold ${activeData === "Losers" ? "text-[var(--blue)] underline hover:bg-[var(--lightBlue)]" : ""}`}>
          <h3 className="font-bold">Losers</h3>
        </button>
      </div>
      <div className="mx-auto w-full">
        <div className="grid grid-cols-4 gap-4 mb-3 text-center">
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
