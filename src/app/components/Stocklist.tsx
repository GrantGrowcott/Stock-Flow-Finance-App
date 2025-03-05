"use client";
import ThemeToggle from "../context/ThemeContext";

type Stock = {
  symbol: string;
  date: string;
  reportedCurrency: string;
  fillingDate: string;
  revenue: string;
};

type StockListProps = {
  stocks: Stock[];
};

export default function StockList({ stocks }: StockListProps) {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-5xl">Stock Search Results</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.date}>
            {stock.date} {stock.revenue} {stock.symbol}
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </div>
  );
}
