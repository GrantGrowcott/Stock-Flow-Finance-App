import { useQuery } from "@apollo/client";
import { GET_STOCK_INFORMATION } from "@/constants";
import { SymbolProps } from "@/constants";
import { formatNumbers } from "../../../helpers/helpers";

const KeyFinancialStats = ({ symbol }: SymbolProps) => {
  const { data, error } = useQuery(GET_STOCK_INFORMATION, {
    variables: { symbol },
  });

  if (error) return <p>Error fetching data.</p>;
  if (!data || !data.getStockInformation) {
    return <p>No stock information available.</p>;
  }

  const stock = data.getStockInformation;
  return (
    <div className="mt-10">
      <h3 className="text-2xl text-center">Key Financial Data</h3>
      <div className="flex items-start justify-around">
        <ul className="flex items-start justify-center gap-5">
          <div>
            <li>Return on Equity:</li>
            <li>Return on Invested Capital:</li>
            <li>Retained Earnings:</li>
            <li>DCF Buy Price:</li>
            <li>Market Cap:</li>
            <li>Gross Margin:</li>
            <li>Price Range:</li>
          </div>
          <div>
            <li>a</li>
            <li>a</li>
            <li>a</li>
            <li>${stock.dcf.toFixed(2)}</li>
            <li>{formatNumbers(stock.mktCap)} </li>
            <li>a</li>
            <li>${stock.range}</li>
          </div>
        </ul>
        <ul>
          <li>Debt/Equity Ratio:</li>
          <li>Interest Coverage Ratio:</li>
          <li>Current Ratio:</li>
          <li>Dividend Payout Ratio:</li>
          <li>Price/Book Ratio:</li>
          <li>LTM Price/Earnings:</li>
        </ul>
      </div>
    </div>
  );
};

export default KeyFinancialStats;
