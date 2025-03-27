import { useEffect, useState } from "react";
import { getStockData } from "../api/api";
import { Stock } from "@/constants";

const TrendingStocks = () => {
  const [stockData, setStockData] = useState<{ [key: string]: Stock[] }>({});
  const [activeData, setActiveData] = useState<string>("Active");

  const fetchStockData = async (category: string) => {
    if (!stockData[category]) {
      const data = await getStockData(category);
      setStockData((prev) => ({ ...prev, [category]: data }));
    }
    setActiveData(category);
  };

  useEffect(() => {
    fetchStockData("Active");
  }, []);

  return (
    <div
      className="flex-1 bg-[var(--white)] dark:bg-[var(--darkGrey)] border rounded-lg shadow-lg p-3 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 2rem - 8rem)", boxSizing: "border-box" }}
    >
      <div className="flex flex-1">
        {["Active", "Gainers", "Losers"].map((category) => (
          <button
            key={category}
            onClick={() => fetchStockData(category)}
            className={`py-3 flex-1 font-bold ${
              activeData === category ? "text-[var(--blue)] underline hover:bg-[var(--lightBlue)]" : ""
            }`}
          >
            <h3 className="font-bold">{category}</h3>
          </button>
        ))}
      </div>

      <div className="mx-auto w-full overflow-y-auto" style={{ maxHeight: "calc(100vh - 2rem - 8rem)", boxSizing: "border-box" }}>
        <div className="grid grid-cols-4 gap-4 text-center">
          <h3 className="font-bold">Symbol</h3>
          <h3 className="font-bold">Change</h3>
          <h3 className="font-bold">Price</h3>
          <h3 className="font-bold">% Change</h3>
        </div>
        {stockData[activeData]?.length > 0 ? (
          stockData[activeData].map((stock, index) => (
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
