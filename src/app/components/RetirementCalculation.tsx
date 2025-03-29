"use client";
import { useState } from "react";

const RetirementCalculation = () => {
  const [principle, setPrinciple] = useState<number>(10000);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [futureValue, setFutureValue] = useState<number>(0);

  interface RetirementParams {
    principle: number;
    annualReturn: number;
    currentAge: number;
    retirementAge: number;
    monthlyContribution: number;
  }

  const submitRetirementData = ({
    principle,
    annualReturn,
    currentAge,
    retirementAge,
    monthlyContribution,
  }: RetirementParams) => {
    const ageDifference = retirementAge - currentAge;
    const totalMonths = ageDifference * 12;
    const monthlyReturn = annualReturn / 100 / 12;

    const partTwo = Math.pow(1 + monthlyReturn, totalMonths);

    const partThree = (monthlyContribution * ((1 + monthlyReturn) ** totalMonths - 1)) / monthlyReturn;

    const futureValue = principle * partTwo + partThree;

    setFutureValue(futureValue);
  };

  return (
    <div className="flex flex-col w-[30%] mx-auto gap-3 mt-5 placeholder:dark:text-[var(--white)] dark:bg-[var(--darkGrey)]">
      <h1 className="text-center">Retirement Calculator</h1>
      <input
        type="number"
        value={principle}
        onChange={(e) => setPrinciple(Number(e.target.value))}
        className="border bg-[var(--white)] text-[var(--black)] dark:bg-[var(--darkGrey)] dark:text-[var(--white)]"
      />
      <input
        type="number"
        value={annualReturn}
        onChange={(e) => setAnnualReturn(Number(e.target.value))}
        className="border bg-[var(--white)] text-[var(--black)] dark:bg-[var(--darkGrey)] dark:text-[var(--white)]"
      />
      <input
        type="number"
        value={currentAge}
        onChange={(e) => setCurrentAge(Number(e.target.value))}
        className="border bg-[var(--white)] text-[var(--black)] dark:bg-[var(--darkGrey)] dark:text-[var(--white)]"
      />
      <input
        type="number"
        value={retirementAge}
        onChange={(e) => setRetirementAge(Number(e.target.value))}
        className="border bg-[var(--white)] text-[var(--black)] dark:bg-[var(--darkGrey)] dark:text-[var(--white)]"
      />
      <input
        type="number"
        value={monthlyContribution}
        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
        className="border bg-[var(--white)] text-[var(--black)] dark:bg-[var(--darkGrey)] dark:text-[var(--white)]"
      />
      <button
        onClick={() =>
          submitRetirementData({
            principle,
            annualReturn,
            currentAge,
            retirementAge,
            monthlyContribution,
          })
        }
      >
        <h3>Submit</h3>
      </button>
      <h3>{futureValue}</h3>
    </div>
  );
};

export default RetirementCalculation;
