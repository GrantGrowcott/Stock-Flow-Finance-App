import { FinancialStatementsProps } from "@/constants";

const FinancialStatements = ({ stock, ratios, income, balance, cashflow }: FinancialStatementsProps) => {
  return (
    <div>
      {/* Button Navigation */}
      <ul className="flex content-around items-center gap-3 mx-auto mt-10 w-fit">
        <button>
          <li>Income Statement</li>
        </button>
        <button>
          <li>Balance Sheet</li>
        </button>
        <button>
          <li>Cash Flow Statement</li>
        </button>
        <button>
          <li>Ratios</li>
        </button>
      </ul>

      {/* Financial Data Grid */}
      <ul className="grid grid-cols-6 gap-4 mt-5">
        {/* Cash Flow Statement Header */}
        <li className="col-span-1 font-semibold text-center">Cash Flow Statement</li>

        {/* Map over the cashflow data for years */}
        {cashflow.slice(0, 5).reverse().map((item, index) => (
          <li key={`year-${index}`} className="text-center">
            {item.calendarYear}
          </li>
        ))}

        {/* Net Income Label */}
        <li className="col-span-1 font-semibold text-center">Net Income</li>

        {/* Map over cashflow to display net income for each year */}
        {cashflow.slice(0, 5).reverse().map((item, index) => (
          <li key={`netIncome-${index}`} className="text-center">
            {item.netIncome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialStatements;
