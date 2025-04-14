"use client";
import { useState } from "react";
import YearDropdown from "../components/YearDropdown";
import DiscountCashFlow from "../components/DiscountCashFlow";
import { calculateValuation } from "../../../helpers/helpers";

const RateOfReturn = () => {
  const [earningsPerShare, setEarningsPerShare] = useState<number | string>("19.53");
  const [earningsGrowth, setEarningsGrowth] = useState<number | string>("4");
  const [priceEarnings, setPriceEarnings] = useState<number | string>("18");
  const [discountRate, setDiscountRate] = useState<number | string>("8");
  const [selectedYears, setSelectedYears] = useState<number>(10);
  const [buyPrice, setBuyPrice] = useState<number | string>("");

  const handleSubmit = () => {
    const price = calculateValuation(
      Number(earningsPerShare),
      Number(earningsGrowth),
      Number(priceEarnings),
      Number(discountRate),
      selectedYears
    );
    setBuyPrice(price);
  };

  return (
    <div className="h-[calc(100vh-5rem)] overflow-y-auto ">
      <div className="flex flex-row justify-self-center items-start gap-7 max-xl:flex-col h-full">
        <div className=" flex items-center h-full bg-[var(--white)] my-2 rounded-lg p-3 dark:bg-[var(--darkGrey)]">
          <div className="relative flex flex-col items-center  h-full justify-between">
            <h1 className="font-bold text-2xl">Basic Valuation Model</h1>

            <label className="font-bold my-2">Trailing 12 Months Earnings Per Share (EPS)</label>
            <input
              type="number"
              placeholder="19.53"
              value={earningsPerShare}
              onChange={(e) => setEarningsPerShare(e.target.value)}
              className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2 bg-[var(--grey)]"
            />

            <label className="font-bold my-2">Estimated EPS Growth (Each Year)</label>
            <input
              type="number"
              placeholder="4"
              value={earningsGrowth}
              onChange={(e) => setEarningsGrowth(e.target.value)}
              className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2 bg-[var(--grey)]"
            />
            <label className="font-bold my-2">Price/Earnings Ratio </label>
            <input
              type="number"
              placeholder="18"
              value={priceEarnings}
              onChange={(e) => setPriceEarnings(e.target.value)}
              className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2 bg-[var(--grey)]"
            />
            <label className="font-bold my-2">Desired Annual Rate of Return </label>
            <input
              type="number"
              placeholder="8"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2 bg-[var(--grey)]"
            />
            <YearDropdown selectedYears={selectedYears} setSelectedYears={setSelectedYears} />
              <button onClick={handleSubmit}>
                <h3 className="bg-[var(--blue)] p-3 rounded-md mt-5 ">Submit</h3>
              </button>
              <h3 className="text-xl mt-5 font-bold">Buy Price: {buyPrice}</h3>

          </div>
        </div>
        <DiscountCashFlow />
      </div>
    </div>
  );
};

export default RateOfReturn;
