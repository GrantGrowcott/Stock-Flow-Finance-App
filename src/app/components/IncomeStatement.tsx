import React from "react";
import { IncomeStatement as IncomeStatementType } from "@/constants";
import { formatNumbers } from "../../../helpers/helpers";

// Define the correct prop type for IncomeStatement component
interface IncomeStatementProps {
  income: IncomeStatementType[];
}

const IncomeStatement: React.FC<IncomeStatementProps> = ({ income }) => {
  const latestIncome = income.slice(0, 5).reverse();
  const years = latestIncome.map((item) => item.calendarYear);

  return (
    <div className="grid grid-cols-6 gap-4 mt-5 border border-gray-300 p-4">
      <div className="font-bold"></div>
      {years.map((year, index) => (
        <div key={index} className="font-bold text-center">
          {year}
        </div>
      ))}
      <div className="font-bold">Revenue</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.revenue)}
        </div>
      ))}
      <div className="font-bold">Cost of Revenue</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.costOfRevenue)}
        </div>
      ))}
      <div className="font-bold">Gross Profit</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.grossProfit)}
        </div>
      ))}
      <div className="font-bold">Gross Profit</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {item.grossProfit != null ? Number(item.grossProfitRatio * 100).toFixed(2) + "%"  : "N/A"}
        </div>
      ))}
      <div className="font-bold">R & D Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.researchAndDevelopmentExpenses)}
        </div>
      ))}
      <div className="font-bold">G & A Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.generalAndAdministrativeExpenses)}
        </div>
      ))}
      <div className="font-bold">SG & A Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.sellingGeneralAndAdministrativeExpenses)}
        </div>
      ))}
      <div className="font-bold">Other Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.otherExpenses)}
        </div>
      ))}
      <div className="font-bold">Operating Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.operatingExpenses)}
        </div>
      ))}
      <div className="font-bold">Costs and Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.costAndExpenses)}
        </div>
      ))}
      <div className="font-bold">Interest Income</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.interestIncome)}
        </div>
      ))}
      <div className="font-bold">Interest Expense</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.interestExpense)}
        </div>
      ))}
      <div className="font-bold">Depreciation & Amortization</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.depreciationAndAmortization)}
        </div>
      ))}
      <div className="font-bold">Operating Income</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.operatingIncome)}
        </div>
      ))}
      <div className="font-bold">Operating Ratio</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {(item.operatingIncomeRatio * 100).toFixed(2)}%
        </div>
      ))}
      <div className="font-bold">Total Other Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.totalOtherIncomeExpensesNet)}
        </div>
      ))}
      <div className="font-bold">Income Before Tax</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.incomeBeforeTax)}
        </div>
      ))}
      <div className="font-bold">Income Before Tax Ratio</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {item.grossProfit != null ? Number(item.incomeBeforeTaxRatio * 100).toFixed(2)  : "N/A"}
        </div>
      ))}
      <div className="font-bold">Income Tax Expense</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.incomeTaxExpense)}
        </div>
      ))}
      <div className="font-bold">Net Income</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {formatNumbers(item.netIncome)}
        </div>
      ))}
      <div className="font-bold">EPS</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {item.eps}
        </div>
      ))}
      <div className="font-bold">Weighted Shares Outstanding Basic</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {item.weightedAverageShsOut}
        </div>
      ))}
      <div className="font-bold">Weighted Shares Outstanding Diluted</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {item.weightedAverageShsOutDil}
        </div>
      ))}
    </div>
  );
};

export default IncomeStatement;
