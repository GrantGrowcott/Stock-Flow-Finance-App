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

// https://financialmodelingprep.com/api/v3/cash-flow-statement/AAPL?period=annual&apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

//  Key Ratios

// https://financialmodelingprep.com/api/v3/ratios-ttm/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM


// 5 Years of Key Ratios

// https://financialmodelingprep.com/api/v3/ratios/AAPL?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

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
  export async function getStockData(category: string): Promise<Stock[]> {
    const endpoints: { [key: string]: string } = {
      Active: "stock_market/actives",
      Gainers: "stock_market/gainers",
      Losers: "stock_market/losers",
    };
  
    if (!endpoints[category]) return [];
  
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/${endpoints[category]}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
      );
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching stock data:", error);
      return [];
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
