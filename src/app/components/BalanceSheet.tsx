import { BalanceSheet as BalanceSheetType } from "@/constants";


interface BalanceSheetProps {
  balance: BalanceSheetType[];
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({balance}) => {
    const latestBalance = balance.slice(0, 5).reverse();
    const years = latestBalance.map(item => item.calendarYear);

  return (
    <div className="grid grid-cols-6 gap-4 mt-5 border border-gray-300 p-4"> 

      <div className="font-bold"></div> 
      {years.map((year, index) => (
        <div key={index} className="font-bold text-center">{year}</div>
      ))}
      <div className="font-bold">Cash and Cash Equivalents</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.cashAndCashEquivalents}</div>
      ))}
      <div className="font-bold">Short Term Investments</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.shortTermInvestments}</div>
      ))}
      <div className="font-bold">Cash and Short Term Investments</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.cashAndShortTermInvestments}</div>
      ))}
      <div className="font-bold">Net Receivables</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.netReceivables}</div>
      ))}
      <div className="font-bold">Inventory</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.inventory}</div>
      ))}
      <div className="font-bold">Other Current Assets</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.otherCurrentAssets}</div>
      ))}
      <div className="font-bold">Total Current Assets</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.totalCurrentAssets}</div>
      ))}
      <div className="font-bold">Property Plant & Equipment</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.propertyPlantEquipmentNet}</div>
      ))}
      <div className="font-bold">Goodwill</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.goodwill}</div>
      ))}
      <div className="font-bold">Intangible Assets</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.intangibleAssets}</div>
      ))}
      <div className="font-bold">Long Term Investments</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.longTermInvestments}</div>
      ))}
      <div className="font-bold">Tax Assets</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.taxAssets}</div>
      ))}
      <div className="font-bold">Other Non Current Assets</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.otherNonCurrentAssets}</div>
      ))}
      <div className="font-bold">Total Non Current Assets</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.totalNonCurrentAssets}</div>
      ))}
      <div className="font-bold">Total Assets</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.totalAssets}</div>
      ))}
      <div className="font-bold">Accounts Payable</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.accountPayables}</div>
      ))}
      <div className="font-bold">Short Term Debt</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.shortTermDebt}</div>
      ))}
      <div className="font-bold">Tax Payable</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.taxPayables}</div>
      ))}
      <div className="font-bold">Deferred Revenue</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.deferredRevenue}</div>
      ))}
      <div className="font-bold">Other Current Liabilities</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.otherCurrentLiabilities}</div>
      ))}
      <div className="font-bold">Total Current Liabilities</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.totalCurrentLiabilities}</div>
      ))}
      <div className="font-bold">Long Term Debt</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.longTermDebt}</div>
      ))}
      <div className="font-bold">Deferred Revenue Non Current</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.deferredRevenueNonCurrent}</div>
      ))}
      <div className="font-bold">Other Non Current Liabilities</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.otherNonCurrentLiabilities}</div>
      ))}
      <div className="font-bold">Total Non Current Liabilities</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.totalNonCurrentLiabilities}</div>
      ))}
      <div className="font-bold">Other Liabilities</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.otherLiabilities}</div>
      ))}
      <div className="font-bold">Capital Lease Obligations</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.capitalLeaseObligations}</div>
      ))}
      <div className="font-bold">Total Liabilities</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.totalLiabilities}</div>
      ))}
      <div className="font-bold">Common Stock</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.commonStock}</div>
      ))}
      <div className="font-bold">Retained Earnings</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.retainedEarnings}</div>
      ))}
      <div className="font-bold">Total Stockholder Equity</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.totalStockholdersEquity}</div>
      ))}
       <div className="font-bold">Total Equity</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.totalEquity}</div>
      ))}
       <div className="font-bold">Total Liabilities & Equity</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.totalLiabilitiesAndStockholdersEquity}</div>
      ))}
       <div className="font-bold">Total Debt</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.totalDebt}</div>
      ))}
      <div className="font-bold">Net Debt</div>
      {latestBalance.map((item, index) => (
        <div key={index} className="text-center">{item.netDebt}</div>
      ))}
    </div>
    
  );
}
 
export default BalanceSheet;