"use client";
import { useState } from "react";
import YearDropdown from "./YearDropdown";

const DiscountCashFlow = () => {
  const [freeCashFlow, setFreeCashFlow] = useState<number | string>("100");
  const [wacc, setWacc] = useState<number | string>("10");
  const [selectedYears, setSelectedYears] = useState<number>(5);
  const [freeCashGrowth, setFreeCashGrowth] = useState<number | string>("5");
  const [terminalGrowthRate, setTerminalGrowthRate] = useState<number | string>("3");
  const [sharesOutstanding, setSharesOutstanding] = useState<number | string>("10")
  const [equityValue, setEquityValue] = useState<number | string>("")


  const calculateTerminalValue = () => {
    let currentFCF = Number(freeCashFlow);
    const freeGrowth = Number(freeCashGrowth)/100
    const rate = Number(terminalGrowthRate) / 100;
    const discount = Number(wacc) / 100;
  
    const projectedFCFs: number[] = [];
  
    // 1. Project FCFs for each year
    for (let i = 0; i < selectedYears; i++) {
      if (i !== 0) currentFCF *= 1 + freeGrowth;
      projectedFCFs.push(currentFCF);
    }
  
    // 2. Discount each FCF to present value
    const discountedFCFs = projectedFCFs.map((fcf, i) => {
      return fcf / Math.pow(1 + discount, i + 1);
    });
  
    // 3. Calculate Terminal Value (Gordon Growth)
    const finalYearFCF = projectedFCFs[projectedFCFs.length - 1];
    const terminalValue = (finalYearFCF * (1 + rate)) / (discount - rate);
  
    // 4. Discount Terminal Value to present value
    const discountedTerminalValue = terminalValue / Math.pow(1 + discount, selectedYears);
  
    // 5. Sum all values
    const totalValue = discountedFCFs.reduce((sum, val) => sum + val, 0) + discountedTerminalValue;

    const perShareValue = totalValue / Number(sharesOutstanding)
    setEquityValue("$" + perShareValue.toFixed(2))
  
    console.log("Projected FCFs:", projectedFCFs);
    console.log("Discounted FCFs:", discountedFCFs);
    console.log("Terminal Value:", terminalValue.toFixed(2));
    console.log("Discounted Terminal Value:", discountedTerminalValue.toFixed(2));
    console.log("Intrinsic Value:", totalValue.toFixed(2));
    console.log("Per Share Value",perShareValue)
  };
  


  return (
    <div className="flex flex-col items-center justify-center my-8">
        <h1 className="font-bold text-2xl">Discounted Cash Flow Analysis</h1>
        
        
      <label className="font-bold my-2">Free Cash Flow in Year 1 (MM)</label>
      <input
        type="number"
        placeholder="100"
        value={freeCashFlow}
        onChange={(e) => setFreeCashFlow(e.target.value)}
        className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2"
      />
      <label className="font-bold my-2">WACC (%)</label>
      <input
        type="number"
        placeholder="10"
        value={wacc}
        onChange={(e) => setWacc(e.target.value)}
        className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2"
      />
      <label className="font-bold my-2">Free Cash Growth Rate (%)</label>
      <input
        type="number"
        placeholder="10"
        value={freeCashGrowth}
        onChange={(e) => setFreeCashGrowth(e.target.value)}
        className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2"
      />
      <label className="font-bold my-2">Terminal Growth Rate (%)</label>
      <input
        type="number"
        placeholder="10"
        value={terminalGrowthRate}
        onChange={(e) => setTerminalGrowthRate(e.target.value)}
        className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2"
      />
      <label className="font-bold my-2">Share Outstanding (MM)</label>
      <input
        type="number"
        placeholder="10"
        value={sharesOutstanding}
        onChange={(e) => setSharesOutstanding(e.target.value)}
        className="pl-1 text-[var(--black)] placeholder:text-[var(--black)] rounded-md my-2"
      />
      <YearDropdown selectedYears={selectedYears} setSelectedYears={setSelectedYears} />
      <button onClick={calculateTerminalValue} className="bg-[var(--blue)] p-3 rounded-md mt-5">
        Submit
      </button>

      <h3 className="text-xl mt-5">Buy Price:{equityValue}</h3>
    </div>
  );
};

export default DiscountCashFlow;
