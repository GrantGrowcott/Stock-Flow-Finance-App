import StockList from "./Stocklist";

// This is the link to the api endpoint for me to call each time
// https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements

// async function getStocks() {
//   const res = await fetch(
//     "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM",
//     { cache: "no-store" } // Ensures fresh data on every request (SSR)
//   );
//   return res.json();
// }

//  Mock Data so that I don't have to pull from the api continuously (max or 250 api calls)
const mockStocks = Array.from({ length: 5 }, (_, yearIndex) => {
  const year = new Date().getFullYear() - yearIndex;
  return {
    symbol: "AAPL", // Example stock symbol
    date: `${year}-12-31`, // Example: Dec 31st of each year
    reportedCurrency: "USD",
    fillingDate: `${year}-01-01`, // Assume filling date is the start of the year
    revenue: (Math.random() * (500000000000 - 100000000000) + 100000000000).toFixed(0), // Random revenue between 100B and 500B
  };
});

export default async function HomePage() {
  const stocks = await mockStocks; // Fetch data on the server

  return <StockList stocks={stocks} />;
}
