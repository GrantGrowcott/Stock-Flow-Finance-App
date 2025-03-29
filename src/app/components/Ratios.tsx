import { Ratios as RatiosType } from "@/constants";

interface RatiosProps {
  ratios: RatiosType[];
}
const Ratios: React.FC<RatiosProps> = ({ ratios }) => {
  const latestRatios = ratios.slice(0, 5).reverse();
  const years = latestRatios.map((item) => item.calendarYear);

  return (
    <div className="grid grid-cols-6 gap-4 mt-5 border border-gray-300 p-4">
      <div className="font-bold"></div>
      {years.map((year, index) => (
        <div key={index} className="font-bold text-center">
          {year}
        </div>
      ))}
      <div className="font-bold">Current Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.currentRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Quick Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.quickRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Cash Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.cashRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Days of Sales Outstanding</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.daysOfSalesOutstanding.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Days of Inventory Outstanding</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.daysOfInventoryOutstanding.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Operating Cycle</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.operatingCycle.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Days of Payables Outstanding</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.daysOfPayablesOutstanding.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Cash Conversion Cycle</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.cashConversionCycle.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Gross Profit Margin</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.grossProfitMargin !== null && item.grossProfitMargin !== undefined
            ? (item.grossProfitMargin * 100).toFixed(2)
            : "N/A"}
        </div>
      ))}
      <div className="font-bold">Operating Profit Margin</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.operatingProfitMargin !== null && item.operatingProfitMargin !== undefined
            ? (item.operatingProfitMargin * 100).toFixed(2)
            : "N/A"}
        </div>
      ))}
      <div className="font-bold">Pretax Profit Margin</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.pretaxProfitMargin !== null && item.pretaxProfitMargin !== undefined
            ? (item.pretaxProfitMargin * 100).toFixed(2)
            : "N/A"}
        </div>
      ))}
      <div className="font-bold">Net Profit Margin</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.netProfitMargin !== null && item.netProfitMargin !== undefined
            ? (item.netProfitMargin * 100).toFixed(2)
            : "N/A"}
        </div>
      ))}
      <div className="font-bold">Effective Tax Rate</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.effectiveTaxRate.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Return on Assets</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.returnOnAssets !== null && item.returnOnAssets !== undefined
            ? (item.returnOnAssets * 100).toFixed(2)
            : "N/A"}
        </div>
      ))}
      <div className="font-bold">Return on Equity</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.returnOnEquity !== null && item.returnOnEquity !== undefined
            ? (item.returnOnEquity * 100).toFixed(2)
            : "N/A"}
        </div>
      ))}
      <div className="font-bold">Return on Capital Employed</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.returnOnCapitalEmployed !== null && item.returnOnCapitalEmployed !== undefined
            ? (item.returnOnCapitalEmployed * 100).toFixed(2)
            : "N/A"}
        </div>
      ))}
      <div className="font-bold">Net Income/EBT</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.netIncomePerEBT.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Debt Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.debtRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Debt/Equity Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.debtEquityRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Long Term Debt to Capitalization</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.longTermDebtToCapitalization.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Interest Coverage</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.interestCoverage.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Cashflow/Debt Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.cashFlowToDebtRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Inventory Turnover</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.inventoryTurnover.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Free Cash Flow/ Share</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.freeCashFlowPerShare.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Payout Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.payoutRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Dividend Payout Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.dividendPayoutRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Price/Book Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceToBookRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Price/Sales Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceToSalesRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Price/Earnings Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceEarningsRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Price/Free Cashflow Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceToFreeCashFlowsRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Price/Operating Cashflow Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceToOperatingCashFlowsRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">PEG Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceEarningsToGrowthRatio.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Dividend Yield</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.dividendYield.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Enterprise Value Multiple</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.enterpriseValueMultiple.toFixed(2) ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Fair Value Price</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceFairValue.toFixed(2) ?? "N/A"}
        </div>
      ))}
    </div>
  );
};

export default Ratios;
