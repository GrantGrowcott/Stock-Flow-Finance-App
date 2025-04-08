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

  const calculateValuation = () => {
    const futureEarnings = Number(earningsPerShare) * Math.pow(1 + Number(earningsGrowth) / 100, selectedYears);
    console.log(futureEarnings);

    const futurePrice = futureEarnings * Number(priceEarnings);
    console.log(futurePrice);

    const presentValue = futurePrice / Math.pow(1 + Number(discountRate) / 100, selectedYears);
    console.log(presentValue);
  };

  return (
    <>
      <div className="relative p-3 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl">Basic Valuation Model</h1>
          <YearDropdown selectedYears={selectedYears} setSelectedYears={setSelectedYears} />

          <label>Trailing 12 Months Earnings Per Share (EPS)</label>
          <input
            type="number"
            placeholder="19.53"
            value={earningsPerShare}
            onChange={(e) => setEarningsPerShare(e.target.value)}
          />
          <label>Estimated EPS Growth (Each Year)</label>
          <input
            type="number"
            placeholder="4"
            value={earningsGrowth}
            onChange={(e) => setEarningsGrowth(e.target.value)}
          />
          <label>Price/Earnings Ratio </label>
          <input
            type="number"
            placeholder="18"
            value={priceEarnings}
            onChange={(e) => setPriceEarnings(e.target.value)}
          />
          <label>Desired Annual Rate of Return </label>
          <input type="number" placeholder="8" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} />

          <button onClick={calculateValuation}>
            <h3>Submit</h3>
          </button>
        </div>
      </div>
      <DiscountCashFlow/>
    </>
  );
};

export default RateOfReturn;
