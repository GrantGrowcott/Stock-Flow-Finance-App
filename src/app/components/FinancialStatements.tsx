import { FinancialStatementsProps } from "@/constants";
import React, { useState } from "react";
import IncomeStatement from "./IncomeStatement";

const FinancialStatements = ({ ratios, income, balance, cashflow }: FinancialStatementsProps) => {
  const [activeStatement, setActiveStatement] = useState<string>("Income"); // Track the active statement

  // Define the statementHandle function
  const statementHandle = (statement: string) => {
    setActiveStatement(statement); // Set the active statement
    if (statement === "Income") {
      setActiveStatement("Income");
    } else if (statement === "Balance") {
      setActiveStatement("Balance");
    } else if (statement === "Cashflow") {
      setActiveStatement("Cashflow");
    } else if (statement === "Ratios") {
      setActiveStatement("Ratios");
    }
  };

  return (
    <div>
      <ul className="flex content-around items-center gap-3 mx-auto mt-10 w-fit">
        <button onClick={() => statementHandle("Income")}>
          <li>Income Statement</li>
        </button>
        <button onClick={() => statementHandle("Balance")}>
          <li>Balance Sheet</li>
        </button>
        <button onClick={() => statementHandle("Cashflow")}>
          <li>Cash Flow Statement</li>
        </button>
        <button onClick={() => statementHandle("Ratios")}>
          <li>Ratios</li>
        </button>
      </ul>
      {activeStatement === "Income" && <IncomeStatement income={income} />}
    </div>
  );
};

export default FinancialStatements;

{
  /* <ul className="grid grid-cols-6 gap-4 mt-5">
        <li></li>
        {cashflow
          .slice(0, 5)
          .reverse()
          .map((item, index) => (
            <li key={`year-${index}`} className="text-center">
              {item.calendarYear}
            </li>
          ))}

        {/* Financial Data Rows */
}
//   {labelKey.map(({ label, key }) => (
//     <React.Fragment key={key}>
//       <li className="col-span-1 font-semibold text-center">{label}</li>
//       {statementData
//         .slice(0, 5)
//         .reverse()
//         .map((item, index) => (
//           <li key={`${key}-${index}`} className="text-center">
//             {item[key]}
//           </li>
//         ))}
//     </React.Fragment>
//   ))}
// </ul> */}
