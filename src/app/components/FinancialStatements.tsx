import { FinancialStatementsProps } from "@/constants";
import React, { useState } from "react";
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import CashflowStatement from "./CashflowStatement";
import Ratios from "./Ratios";

const FinancialStatements = ({ ratios, income, balance, cashflow }: FinancialStatementsProps) => {
  const [activeStatement, setActiveStatement] = useState<string>("Income");

  const statementHandle = (statement: string) => {
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
          <li className={`font-semibold ${activeStatement === "Income" ? "underline decoration-4 decoration-[var(--blue)]" : ""}`}>Income Statement</li>
        </button>
        <button onClick={() => statementHandle("Balance")}>
          <li className={`font-semibold ${activeStatement === "Balance" ? "underline decoration-4 decoration-[var(--blue)]" : ""}`}>Balance Sheet</li>
        </button>
        <button onClick={() => statementHandle("Cashflow")}>
          <li className={`font-semibold ${activeStatement === "Cashflow" ? "underline decoration-4 decoration-[var(--blue)]" : ""}`}>
            Cash Flow Statement
          </li>
        </button>
        <button onClick={() => statementHandle("Ratios")}>
          <li className={`font-semibold ${activeStatement === "Ratios" ? "underline decoration-4 decoration-[var(--blue)]" : ""}`}>Ratios</li>
        </button>
      </ul>

      {activeStatement === "Income" && <IncomeStatement income={income} />}
      {activeStatement === "Balance" && <BalanceSheet balance={balance} />}
      {activeStatement === "Cashflow" && <CashflowStatement cashflow={cashflow} />}
      {activeStatement === "Ratios" && <Ratios ratios={ratios} />}
    </div>
  );
};

export default FinancialStatements;
