import { useQuery } from "@apollo/client";
import { GET_STOCK_INFORMATION, GET_RATIOS, GET_INCOME_STATEMENT, GET_BALANCE_SHEET, GET_CASHFLOW } from "@/constants";
import { SymbolProps } from "@/constants";
import { formatNumbers } from "../../../helpers/helpers";
import FinancialStatements from "./FinancialStatements";

const KeyFinancialStats = ({ symbol }: SymbolProps) => {
  const {
    data: stockData,
    loading: stockLoading,
    error: stockError,
  } = useQuery(GET_STOCK_INFORMATION, {
    variables: { symbol },
  });

  const {
    data: ratiosData,
    loading: ratiosLoading,
    error: ratiosError,
  } = useQuery(GET_RATIOS, {
    variables: { symbol },
  });

  const {
    data: incomeData,
    loading: incomeLoading,
    error: incomeError,
  } = useQuery(GET_INCOME_STATEMENT, {
    variables: { symbol },
  });

  const {
    data: balanceData,
    loading: balanceLoading,
    error: balanceError,
  } = useQuery(GET_BALANCE_SHEET, {
    variables: { symbol },
  });

  const {
    data: cashflowData,
    loading: cashflowLoading,
    error: cashflowError,
  } = useQuery(GET_CASHFLOW, {
    variables: { symbol },
  });

  if (stockLoading || ratiosLoading || incomeLoading || balanceLoading || cashflowLoading) {
    return <p>Loading financial data...</p>;
  }
  if (stockError || ratiosError || incomeError || balanceError || cashflowError) {
    return <p>Error fetching data.</p>;
  }
  if (
    !stockData?.getStockInformation ||
    !ratiosData?.getRatios ||
    !incomeData?.getIncomeStatement ||
    !balanceData?.getBalanceSheet ||
    !cashflowData?.getCashflow
  ) {
    return <p>No financial data available.</p>;
  }

  const stock = stockData.getStockInformation;
  const ratios = ratiosData.getRatios;
  const income = incomeData.getIncomeStatement;
  const balance = balanceData.getBalanceSheet;
  const cashflow = cashflowData.getCashflow;
  return (
    <>
      <div className="mt-10">
        <h3 className="text-2xl text-center">Key Financial Data</h3>
        <div className="flex items-start justify-around gap-5 max-[1000px]:flex-col ">
          <ul className="flex items-start justify-center gap-4 max-[1000px]:self-center ">
            <div>
              <li>Return on Equity:</li>
              <li>Return on Capital:</li>
              <li>Retained Earnings:</li>
              <li>DCF Buy Price:</li>
              <li>Market Cap:</li>
              <li>Gross Margin:</li>
              <li>Price Range:</li>
            </div>
            <div>
              <li>{(ratios[0].returnOnEquity * 100).toFixed(2)}%</li>
              <li>{((ratios[0].returnOnEquity / (1 + ratios[0].debtEquityRatio)) * 100).toFixed(2)}%</li>
              <li>{formatNumbers(balance[0].retainedEarnings)}</li>
              <li>${stock.dcf.toFixed(2)}</li>
              <li>{formatNumbers(stock.mktCap)} </li>
              <li>{(ratios[0].grossProfitMargin * 100).toFixed(2)}%</li>
              <li>${stock.range}</li>
            </div>
          </ul>
          <ul className="flex items-start justify-center gap-8 max-[1000px]:self-center">
            <div>
              <li>Debt/Equity Ratio:</li>
              <li>Interest Coverage Ratio:</li>
              <li>Current Ratio:</li>
              <li>Dividend Payout Ratio:</li>
              <li>LTM Price/Book Ratio:</li>
              <li>LTM Price/Earnings:</li>
              <li>LTM Price/Free Cashflow:</li>
            </div>
            <div>
              <li>{ratios[0].debtEquityRatio.toFixed(2)}</li>
              <li>{ratios[0].interestCoverage.toFixed(2)}</li>
              <li>{ratios[0].currentRatio.toFixed(2)}</li>
              <li>{ratios[0].dividendPayoutRatio.toFixed(2)}</li>
              <li>{ratios[0].priceToBookRatio.toFixed(2)}</li>
              <li>{ratios[0].priceEarningsRatio.toFixed(2)}</li>
              <li>{ratios[0].priceToFreeCashFlowsRatio.toFixed(2)}</li>
            </div>
          </ul>
        </div>
      </div>
      <FinancialStatements ratios={ratios} income={income} balance={balance} cashflow={cashflow} />
    </>
  );
};

export default KeyFinancialStats;
