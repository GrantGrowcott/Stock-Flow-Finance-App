import { Dispatch } from "@reduxjs/toolkit";
import { setTickerData } from "../store/tickerSlice";
import { Stock } from "@/constants";
import { PriceHistory } from "@/constants";




// Historical Price over the last 5 years( each day)

// https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

// Full Company Profile ( not available on free tier)

// https://financialmodelingprep.com/api/v4/company-outlook?symbol=AAPL&apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

// Profile of Company 
// Includes the company image, description, market cap, current price ticker etc  

// https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

// Income Statement

// https://financialmodelingprep.com/api/v3/income-statement/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

// Balance Sheet

// https://financialmodelingprep.com/api/v3/balance-sheet-statement/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

// Cash Flow Statement

// https://financialmodelingprep.com/api/v3/cash-flow-sheet-statement/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

//  Key Ratios

// https://financialmodelingprep.com/api/v3/ratios-ttm/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM


// ROIC = ROE x (1/ (1 + (debt to equity ratio) x (1 - effective tax rate))
//  Can find effective tax rate TTM in the ratios api
//  Debt to equity is calculated through the balance sheet (total debt / total shareholder equity)


//  Use checks and x's if the values(key metrics) are at appropriate ranges for values investing ( my hurdle rates)
// Graph on the left, key metrics to the right, below all of this will be the financial statements


// Stock Data for Search Dropdown Menu 
export async function getStockTicker (dispatch: Dispatch ,ticker: string) {
   
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/search-ticker?query=${ticker}&limit=10&apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`);
        const data = await response.json();
        dispatch(setTickerData(data)); 
    } catch (error) {
        console.error("Error fetching stock ticker:", error);
        setTickerData([]);
    }

}
// Retrieves Market News to be displayed on the home page
export async function getNews() {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=business&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      );
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching news:", error);
      return { articles: [] };
    }
  }


  // Retrieves the most active, gainers and losers from the stock market each day.
  export async function getStockData( setStockData: React.Dispatch<React.SetStateAction<Stock[]>>, setActiveData: React.Dispatch<React.SetStateAction<string>>, category:string) {
  
    if (category === "Active") {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`);
        const data = await response.json();
        setStockData(data);
        setActiveData("Active");
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setStockData([]);
      }
    }
    else if (category === "Gainers") {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`);
        const data = await response.json();
        setStockData(data);
        setActiveData("Gainers");
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setStockData([]);
      }
    }
    else if (category === "Losers") {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`);
        const data = await response.json();
        setStockData(data);
        setActiveData("Losers");
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setStockData([]);
      }
    }
  }


// Function to filter the data based on active time
export const filterData = (data: PriceHistory[], activeTime: string): PriceHistory[] => {
  let filteredData = data;

  if (activeTime === "3m") {
    filteredData = data.slice(0, 90); 
  } else if (activeTime === "6m") {
    filteredData = data.slice(0, 180); 
  } else if (activeTime === "1y") {
    filteredData = data.slice(0, 365); 
  } else if (activeTime === "5y") {
    filteredData = data; 
  }

  return filteredData;
};

// Function to format the chart data
export const chartData = (data: PriceHistory[], activeTime: string) => {
  return filterData(data, activeTime)
    .slice()
    .reverse()
    .map((item: { date: string; close: number }) => ({
      date: item.date,
      close: item.close,
    }));
};
