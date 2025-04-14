"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { FinalValues, icons } from "@/constants";
import { calculateRetirement, checkDeathValue} from "../../../helpers/helpers";


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

  
  const handleSubmit = () => {
    const result = calculateRetirement({
      principle,
      annualReturn,
      currentAge,
      retirementAge,
      monthlyContribution,
      withdraw,
      death,
    });
  
    setRetirementMoney(result.retirementMoney);
    setDeathMoney(result.deathMoney);
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
            onClick={handleSubmit
            }
            className="bg-[var(--blue)] text-[var(--white)] py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col w-[100%] mb-8 text-center">
          <h3 className="text-lg font-bold mb-2">📈 Investment Growth & Withdrawal</h3>
          <ResponsiveContainer width="100%" height={icons.containerHeight}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="age"
                type="number"
                domain={["auto", "auto"]}
                tick={{ fontSize: 12 }}
                label={{ value: "Age", position: "insideBottomRight", offset: -5 }}
              />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} width={icons.yWidth} />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
              <Line data={retirementMoney} type="monotone" dataKey="value" stroke="var(--blue)" name="Growth" />
              <Line data={deathMoney} type="monotone" dataKey="value" stroke="var(--red)" name="Post-Retirement" />
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
