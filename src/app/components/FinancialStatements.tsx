import { FinancialStatementsProps } from "@/constants";

const FinancialStatements = ({ stock, ratios, income, balance, cashflow }: FinancialStatementsProps) => {
  return (
    <div>
      <h1>{stock.companyName}</h1>
      <h1>{ratios.assetTurnoverTTM}</h1>
      <h1>{income.calendarYear}</h1>
      <h1>{balance.calendarYear}</h1>
      <h1>{cashflow.inventory}</h1>
    </div>
  );
};

export default FinancialStatements;
