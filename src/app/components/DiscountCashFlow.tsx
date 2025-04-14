"use client";
import { useState } from "react";
import YearDropdown from "./YearDropdown";
import { calculateDCF } from "../../../helpers/helpers";

const DiscountCashFlow = () => {
  const [freeCashFlow, setFreeCashFlow] = useState<number | string>("100");
  const [wacc, setWacc] = useState<number | string>("10");
  const [selectedYears, setSelectedYears] = useState<number>(5);
  const [freeCashGrowth, setFreeCashGrowth] = useState<number | string>("5");
  const [terminalGrowthRate, setTerminalGrowthRate] = useState<number | string>("3");
  const [sharesOutstanding, setSharesOutstanding] = useState<number | string>("10");
  const [equityValue, setEquityValue] = useState<number | string>("");

  const handleCalculate = () => {
    const value = calculateDCF({
      freeCashFlow: Number(freeCashFlow),
      freeCashGrowth: Number(freeCashGrowth),
      terminalGrowthRate: Number(terminalGrowthRate),
      wacc: Number(wacc),
      sharesOutstanding: Number(sharesOutstanding),
      selectedYears: selectedYears,
    });

    setEquityValue("$" + value.toFixed(2));
  };

  return (
    <div className="flex flex-col items-center justify-between  h-full bg-[var(--white)] mt-2 rounded-lg p-3 dark:bg-[var(--darkGrey)]">
      <h1 className="font-bold text-2xl">Discounted Cash Flow Analysis</h1>
      <label className="font-bold my-2">Free Cash Flow in Year 1 (MM)</label>
      <input
        type="number"
        placeholder="100"
        value={freeCashFlow}
        onChange={(e) => setFreeCashFlow(e.target.value)}
        className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2 bg-[var(--grey)]"
      />
      <label className="font-bold my-2">WACC (%)</label>
      <input
        type="number"
        placeholder="10"
        value={wacc}
        onChange={(e) => setWacc(e.target.value)}
        className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2 bg-[var(--grey)]"
      />
      <label className="font-bold my-2">Free Cash Growth Rate (%)</label>
      <input
        type="number"
        placeholder="10"
        value={freeCashGrowth}
        onChange={(e) => setFreeCashGrowth(e.target.value)}
        className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2 bg-[var(--grey)]"
      />
      <label className="font-bold my-2">Terminal Growth Rate (%)</label>
      <input
        type="number"
        placeholder="10"
        value={terminalGrowthRate}
        onChange={(e) => setTerminalGrowthRate(e.target.value)}
        className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2 bg-[var(--grey)]"
      />
      <label className="font-bold my-2">Share Outstanding (MM)</label>
      <input
        type="number"
        placeholder="10"
        value={sharesOutstanding}
        onChange={(e) => setSharesOutstanding(e.target.value)}
        className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2 bg-[var(--grey)]"
      />
      <YearDropdown selectedYears={selectedYears} setSelectedYears={setSelectedYears} />
      <button onClick={handleCalculate} className="bg-[var(--blue)] p-3 rounded-md mt-5">
        Submit
      </button>

      <h3 className="text-xl mt-5 font-bold">Buy Price:{equityValue}</h3>
    </div>
  );
};

export default DiscountCashFlow;
