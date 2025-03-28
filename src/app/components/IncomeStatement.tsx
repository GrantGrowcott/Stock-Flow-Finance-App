import React from "react";
import { IncomeStatement as IncomeStatementType } from "@/constants";

// Define the correct prop type for IncomeStatement component
interface IncomeStatementProps {
  income: IncomeStatementType[];
}

const IncomeStatement: React.FC<IncomeStatementProps> = ({ income }) => {
  const latestIncome = income.slice(0, 5).reverse();
  const years = latestIncome.map(item => item.calendarYear);

  return (
    <div className="grid grid-cols-6 gap-4 mt-5 border border-gray-300 p-4"> 

      <div className="font-bold"></div> 
      {years.map((year, index) => (
        <div key={index} className="font-bold text-center">{year}</div>
      ))}
      <div className="font-bold">Revenue</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.revenue}</div>
      ))}
      <div className="font-bold">Cost of Revenue</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.costOfRevenue}</div>
      ))}
      <div className="font-bold">Gross Profit</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.grossProfit}</div>
      ))}
      <div className="font-bold">Gross Profit Ratio</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.grossProfitRatio}</div>
      ))}
      <div className="font-bold">R & D Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.researchAndDevelopmentExpenses}</div>
      ))}
      <div className="font-bold">G & A Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.generalAndAdministrativeExpenses}</div>
      ))}
      <div className="font-bold">SG & A Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.sellingGeneralAndAdministrativeExpenses}</div>
      ))}
      <div className="font-bold">Other Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.otherExpenses}</div>
      ))}
      <div className="font-bold">Operating Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.operatingExpenses}</div>
      ))}
      <div className="font-bold">Costs and Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.costAndExpenses}</div>
      ))}
      <div className="font-bold">Interest Income</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.interestIncome}</div>
      ))}
      <div className="font-bold">Interest Expense</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.interestExpense}</div>
      ))}
      <div className="font-bold">Depreciation & Amortization</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.depreciationAndAmortization}</div>
      ))}
      <div className="font-bold">Operating Income</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.operatingIncome}</div>
      ))}
      <div className="font-bold">Operating Ratio</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.operatingIncomeRatio}</div>
      ))}
      <div className="font-bold">Total Other Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.totalOtherIncomeExpensesNet}</div>
      ))}
      <div className="font-bold">Income Before Tax</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.incomeBeforeTax}</div>
      ))}
      <div className="font-bold">Income Before Tax Ratio</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.incomeBeforeTaxRatio}</div>
      ))}
      <div className="font-bold">Income Tax Expense</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.incomeTaxExpense}</div>
      ))}
      <div className="font-bold">Net Income</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.netIncome}</div>
      ))}
      <div className="font-bold">EPS</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.eps}</div>
      ))}
      <div className="font-bold">Weighted Shares Outstanding Basic</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.weightedAverageShsOut}</div>
      ))}
      <div className="font-bold">Weighted Shares Outstanding Diluted</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">{item.weightedAverageShsOutDil}</div>
      ))}
    </div>
    
  );
};

export default IncomeStatement;
