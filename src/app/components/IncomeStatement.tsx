import React from "react";
import { IncomeStatement as IncomeStatementType } from "@/constants";
import { displayValue, displayPercent } from "../../../helpers/helpers";

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
          {displayValue(item.revenue)}
        </div>
      ))}

      <div className="font-bold">Cost of Revenue</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.costOfRevenue)}
        </div>
      ))}

      <div className="font-bold">Gross Profit</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.grossProfit)}
        </div>
      ))}

      <div className="font-bold">Gross Profit Ratio</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayPercent(item.grossProfitRatio)}
        </div>
      ))}

      <div className="font-bold">R & D Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.researchAndDevelopmentExpenses)}
        </div>
      ))}

      <div className="font-bold">G & A Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.generalAndAdministrativeExpenses)}
        </div>
      ))}

      <div className="font-bold">SG & A Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.sellingGeneralAndAdministrativeExpenses)}
        </div>
      ))}

      <div className="font-bold">Other Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.otherExpenses)}
        </div>
      ))}

      <div className="font-bold">Operating Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.operatingExpenses)}
        </div>
      ))}

      <div className="font-bold">Costs and Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.costAndExpenses)}
        </div>
      ))}

      <div className="font-bold">Interest Income</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.interestIncome)}
        </div>
      ))}

      <div className="font-bold">Interest Expense</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.interestExpense)}
        </div>
      ))}

      <div className="font-bold">Depreciation & Amortization</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.depreciationAndAmortization)}
        </div>
      ))}

      <div className="font-bold">Operating Income</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.operatingIncome)}
        </div>
      ))}

      <div className="font-bold">Operating Ratio</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayPercent(item.operatingIncomeRatio)}
        </div>
      ))}

      <div className="font-bold">Total Other Expenses</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.totalOtherIncomeExpensesNet)}
        </div>
      ))}

      <div className="font-bold">Income Before Tax</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.incomeBeforeTax)}
        </div>
      ))}

      <div className="font-bold">Income Before Tax Ratio</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayPercent(item.incomeBeforeTaxRatio)}
        </div>
      ))}

      <div className="font-bold">Income Tax Expense</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.incomeTaxExpense)}
        </div>
      ))}

      <div className="font-bold">Net Income</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.netIncome)}
        </div>
      ))}

      <div className="font-bold">EPS</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.eps, false)}
        </div>
      ))}

      <div className="font-bold">Weighted Shares Outstanding Basic</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.weightedAverageShsOut)}
        </div>
      ))}

      <div className="font-bold">Weighted Shares Outstanding Diluted</div>
      {latestIncome.map((item, index) => (
        <div key={index} className="text-center">
          {displayValue(item.weightedAverageShsOutDil)}
        </div>
      ))}
    </div>
  );
};

export default IncomeStatement;
