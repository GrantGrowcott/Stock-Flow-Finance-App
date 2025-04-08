"use client";
import { useState } from "react";
import YearDropdown from "../components/YearDropdown";
import DiscountCashFlow from "../components/DiscountCashFlow";

const RateOfReturn = () => {
  const [earningsPerShare, setEarningsPerShare] = useState<number | string>("19.53");
  const [earningsGrowth, setEarningsGrowth] = useState<number | string>("4");
  const [priceEarnings, setPriceEarnings] = useState<number | string>("18");
  const [discountRate, setDiscountRate] = useState<number | string>("8");
  const [selectedYears, setSelectedYears] = useState<number>(10);
  const [buyPrice, setBuyPrice] = useState<number | string>("");

  const calculateValuation = () => {
    const futureEarnings = Number(earningsPerShare) * Math.pow(1 + Number(earningsGrowth) / 100, selectedYears);

    const futurePrice = futureEarnings * Number(priceEarnings);

    const presentValue = futurePrice / Math.pow(1 + Number(discountRate) / 100, selectedYears);
    setBuyPrice("$" + presentValue.toFixed(2));
  };

  return (
    <div className="h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="p-3 flex items-center justify-center ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl">Basic Valuation Model</h1>
         

          <label className="font-bold my-2">Trailing 12 Months Earnings Per Share (EPS)</label>
          <input
            type="number"
            placeholder="19.53"
            value={earningsPerShare}
            onChange={(e) => setEarningsPerShare(e.target.value)}
            className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2"
          />

          <label className="font-bold my-2">Estimated EPS Growth (Each Year)</label>
          <input
            type="number"
            placeholder="4"
            value={earningsGrowth}
            onChange={(e) => setEarningsGrowth(e.target.value)}
            className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2"
          />
          <label className="font-bold my-2">Price/Earnings Ratio </label>
          <input
            type="number"
            placeholder="18"
            value={priceEarnings}
            onChange={(e) => setPriceEarnings(e.target.value)}
            className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2"
          />
          <label className="font-bold my-2">Desired Annual Rate of Return </label>
          <input type="number" placeholder="8" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)}
          className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2" />
           <YearDropdown selectedYears={selectedYears} setSelectedYears={setSelectedYears} />

          <button onClick={calculateValuation}>
            <h3 className="bg-[var(--blue)] p-3 rounded-md mt-5">Submit</h3>
          </button>
          <h3 className="text-xl mt-5">Buy Price: {buyPrice}</h3>
        </div>
      </div>
      <DiscountCashFlow />
    </div>
  );
};

export default RateOfReturn;
