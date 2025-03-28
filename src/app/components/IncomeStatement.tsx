import React from "react";
import { IncomeStatement as IncomeStatementType } from "@/constants";

// Define the correct prop type for IncomeStatement component
interface IncomeStatementProps {
  income: IncomeStatementType[];
}

const IncomeStatement: React.FC<IncomeStatementProps> = ({ income }) => {
  return (
    <div>
      {/* Render the income data here */}
      {income.map((item, index) => (
        <div key={index}>
          {/* Display properties of each item */}
          <p>{item.calendarYear}</p>
          <p>{item.revenue}</p>
          {/* Add more fields here as per your structure */}
        </div>
      ))}
    </div>
  );
};

export default IncomeStatement;
