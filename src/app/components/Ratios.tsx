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
          {item.currentRatio ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Quick Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.quickRatio ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Cash Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.cashRatio ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Days of Sales Outstanding</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.daysOfSalesOutstanding ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Days of Inventory Outstanding</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.daysOfInventoryOutstanding ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Operating Cycle</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.operatingCycle ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Days of Payables Outstanding</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.daysOfPayablesOutstanding ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Cash Conversion Cycle</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.cashConversionCycle ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Gross Profit Margin</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.grossProfitMargin ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Operating Profit Margin</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.operatingProfitMargin ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Pretax Profit Margin</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.pretaxProfitMargin ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Net Profit Margin</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.netProfitMargin ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Effective Tax Rate</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.effectiveTaxRate ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Return on Assets</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.returnOnAssets ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Return on Equity</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.returnOnEquity ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Return on Capital Employed</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.returnOnCapitalEmployed ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Net Income/EBT</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.netIncomePerEBT ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Debt Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.debtRatio ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Debt/Equity Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.debtEquityRatio ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Long Term Debt to Capitalization</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.longTermDebtToCapitalization ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Interest Coverage</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.interestCoverage ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Cashflow/Debt Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.cashFlowToDebtRatio ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Inventory Turnover</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.inventoryTurnover ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Free Cash Flow/ Share</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.freeCashFlowPerShare ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Payout Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.payoutRatio ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Dividend Payout Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.dividendPayoutRatio ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Price/Book Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceToBookRatio ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Price/Sales Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceToSalesRatio ?? "N/A"}
        </div>
      ))}
       <div className="font-bold">Price/Earnings Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceEarningsRatio ?? "N/A"}
        </div>
      ))}
       <div className="font-bold">Price/Free Cashflow Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceToFreeCashFlowsRatio ?? "N/A"}
        </div>
      ))}
       <div className="font-bold">Price/Operating Cashflow Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceToOperatingCashFlowsRatio ?? "N/A"}
        </div>
      ))}
       <div className="font-bold">PEG Ratio</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceEarningsToGrowthRatio ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Dividend Yield</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.dividendYield ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Enterprise Value Multiple</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.enterpriseValueMultiple ?? "N/A"}
        </div>
      ))}
      <div className="font-bold">Fair Value Price</div>
      {latestRatios.map((item, index) => (
        <div key={index} className="text-center">
          {item.priceFairValue ?? "N/A"}
        </div>
      ))}
    </div>
  );
}
 
export default Ratios;