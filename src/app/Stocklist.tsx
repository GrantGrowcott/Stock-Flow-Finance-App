"use client";

type Stock = {
    symbol: string;
    date: string;
    reportedCurrency: string;
    fillingDate: string;
    revenue: string;
}

type StockListProps = {
    stocks: Stock[]; 
  };

export default function StockList({ stocks }: StockListProps) {
  return (
    <div>
      <h1>Stock Search Results</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.date}>{stock.date} {stock.revenue} {stock.symbol}</li>
        ))}
      </ul>
    </div>
  );
}
