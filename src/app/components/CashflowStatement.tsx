import { CashflowStatement as CashflowStatementType } from "@/constants";

interface CashflowStatementProps {
  cashflow: CashflowStatementType[];
}

const CashflowStatement: React.FC<CashflowStatementProps> = ({ cashflow }) => {
  const latestCashflow = cashflow.slice(0, 5).reverse();
  const years = latestCashflow.map((item) => item.calendarYear);

  return (
    <div className="grid grid-cols-6 gap-4 mt-5 border border-gray-300 p-4">
      <div className="font-bold"></div>
      {years.map((year, index) => (
        <div key={index} className="font-bold text-center">
          {year}
        </div>
      ))}
      <div className="font-bold">Net Income</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.netIncome ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Depreciation & Amortization</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.depreciationAndAmortization ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Deferred Income Tax</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.deferredIncomeTax ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Stock Compensation</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.stockBasedCompensation ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Change in Working Capital</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.changeInWorkingCapital ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Accounts Receivable</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.accountsReceivables ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Inventory</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.inventory ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Accounts Payable</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.accountsPayables ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Other Working Capital</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.otherWorkingCapital ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Other Non Cash Items</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.otherNonCashItems ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Net Cash of Operating Activities</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.netCashProvidedByOperatingActivities ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Property Plant & Equipment</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.investmentsInPropertyPlantAndEquipment ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Purchase of Investments</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.purchasesOfInvestments ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Sales of Investments</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.salesMaturitiesOfInvestments ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Other Investments</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.otherInvestingActivites ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Net Cash for Investing Activities</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.netCashUsedForInvestingActivites ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Debt Repayment</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.debtRepayment ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Common Stock Issued</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.commonStockIssued ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Common Stock Repurchased</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.commonStockRepurchased ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Dividends Paid</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.dividendsPaid ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Other Financing Activities</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.otherFinancingActivites ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Net Cash from Financing</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.netCashUsedProvidedByFinancingActivities ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Net Change in Cash</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.netChangeInCash ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Cash at End Of Period</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.cashAtEndOfPeriod ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Cash at Beginning of Period</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.cashAtBeginningOfPeriod ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Operating Cashflow</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.operatingCashFlow ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Capital Expenditures</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.capitalExpenditure ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Free Cash Flow</div>
      {latestCashflow.map((item, index) => (
        <div key={index} className="text-center">
          {item.freeCashFlow ?? "N/A"}
        </div>
      ))}
    </div>
  );
};

export default CashflowStatement;
