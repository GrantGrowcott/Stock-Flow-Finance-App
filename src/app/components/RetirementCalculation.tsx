"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const RetirementCalculation = () => {
  const [principle, setPrinciple] = useState<number>(10000);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [retirementMoney, setRetirementMoney] = useState<FinalValues[]>([]);
  const [withdraw, setWithdraw] = useState<number>(10000);
  const [death, setDeath] = useState<number>(85);
  const [deathMoney, setDeathMoney] = useState<FinalValues[]>([]);

  interface RetirementParams {
    principle: number;
    annualReturn: number;
    currentAge: number;
    retirementAge: number;
    monthlyContribution: number;
    withdraw: number;
    death: number;
  }

  interface FinalValues {
    age: number;
    value: number;
  }

  const submitRetirementData = ({
    principle,
    annualReturn,
    currentAge,
    retirementAge,
    monthlyContribution,
    withdraw,
    death,
  }: RetirementParams) => {
    const ageDifference = retirementAge - currentAge;
    const monthlyReturn = annualReturn / 100 / 12;

    const futureValues: FinalValues[] = [];
    let balance = principle;

    for (let year = 0; year <= ageDifference; year++) {
      const months = year * 12;
      const partTwo = Math.pow(1 + monthlyReturn, months);
      const partThree = (monthlyContribution * (partTwo - 1)) / monthlyReturn;
      balance = principle * partTwo + partThree;
      futureValues.push({ age: currentAge + year, value: balance });
    }
    setRetirementMoney(futureValues);

    const withdrawalValues: FinalValues[] = [];
    for (let year = retirementAge; year <= death; year++) {
      balance = (balance - withdraw * 12) * (1 + annualReturn / 100);
      if (balance < 0) balance = 0;
      withdrawalValues.push({ age: year, value: balance });
    }
    setDeathMoney(withdrawalValues);
  };

  const checkDeathValue = (deathMoney: FinalValues[]) => {
    const hasZero = deathMoney.some((entry) => entry.value === 0);
    return hasZero
      ? "⚠️ You will **not** have enough money in retirement. Consider reducing your withdrawals or finding more opportunistic investments"
      : "✅ Congratulations, you will have enough money in retirement!!!!";
  };

  return (
    <>
      <div className="flex flex-row w-full gap-8  max-lg:flex-col">
        <div className="flex flex-col gap-3">
          <h1 className="text-center font-bold text-2xl">Investment Withdrawal Calculator</h1>
          <label className="font-bold">Current Total Investment Value ($)</label>
          <input
            type="number"
            value={principle}
            onChange={(e) => setPrinciple(Number(e.target.value))}
            className="border pl-1 text-[color:var(--black)]"
          />
          <label className="font-bold">Annual Rate of Return (%)</label>
          <input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(Number(e.target.value))}
            className="border pl-1 text-[color:var(--black)]"
          />
          <label className="font-bold">Current Age (Years)</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="border pl-1 text-[color:var(--black)]"
          />
          <label className="font-bold">Retirement Age (Years)</label>
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="border pl-1 text-[color:var(--black)]"
          />
          <label className="font-bold">Monthly Contribution Prior to Retirement ($)</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="border pl-1 text-[color:var(--black)]"
          />
          <label className="font-bold">Monthly Withdrawal During Retirement ($)</label>
          <input
            type="number"
            value={withdraw}
            onChange={(e) => setWithdraw(Number(e.target.value))}
            className="border pl-1 text-[color:var(--black)]"
          />
          <label className="font-bold">Estimated Age of Death (Years)</label>
          <input
            type="number"
            value={death}
            onChange={(e) => setDeath(Number(e.target.value))}
            className="border pl-1 text-[color:var(--black)]"
          />
          <button
            onClick={() =>
              submitRetirementData({
                principle,
                annualReturn,
                currentAge,
                retirementAge,
                monthlyContribution,
                withdraw,
                death,
              })
            }
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col w-[100%] mb-8 text-center">
          <h3 className="text-lg font-bold mb-2">📈 Investment Growth & Withdrawal</h3>
          <ResponsiveContainer width="100%" height={600}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="age"
                type="number"
                domain={["auto", "auto"]}
                tick={{ fontSize: 12 }}
                label={{ value: "Age", position: "insideBottomRight", offset: -5 }}
              />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} width={80} />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
              <Line data={retirementMoney} type="monotone" dataKey="value" stroke="#3b82f6" name="Growth" />
              <Line data={deathMoney} type="monotone" dataKey="value" stroke="#ef4444" name="Post-Retirement" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        {deathMoney.length > 0 && (
          <div className="text-center mt-6 font-semibold text-lg">{checkDeathValue(deathMoney)}</div>
        )}
      </div>
      <div className="flex flex-row w-[80%] mx-auto gap-7 max-md:flex-col">
        <div className="mt-4 p-3 border rounded-md flex-1 text-center">
          <h3 className="text-lg font-bold">Yearly Growth:</h3>
          <ul>
            {retirementMoney.map(({ age, value }) => (
              <li key={age}>
                Age {age}: ${value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 p-3 border rounded-md  flex-1 text-center">
          <h3 className="text-lg font-bold">Post-Retirement Withdrawals:</h3>
          <ul>
            {deathMoney.map(({ age, value }) => (
              <li key={age}>
                Age {age}: ${value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RetirementCalculation;
