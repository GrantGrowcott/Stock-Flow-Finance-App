import { Dispatch } from "@reduxjs/toolkit";
import { setTickerData } from "../store/tickerSlice";
import { Stock } from "@/constants";
import { PriceHistory } from "@/constants";
import { TickerData } from "@/constants";
import { supabase } from "../../../lib/supabaseClient";
import { AppDispatch } from "../store";
import { setPortfolioInfo } from "../store/portfolioSlice";

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

// Used to pull ticker data for the portfolio 

export async function getPortfolioTicker (setTickerData: React.Dispatch<React.SetStateAction<TickerData[]>> ,ticker: string) {
   
  try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/search-ticker?query=${ticker}&limit=10&apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`);
      const data = await response.json();
      setTickerData(data); 
  } catch (error) {
      console.error("Error fetching stock ticker:", error);
      setTickerData([]);
  }

}
// Takes in the Ticker Symbol that the person wants to add and calls the api to retrieve more specific data. Then adds that to the database 

export async function setPortfolioData(symbol: string | undefined, dispatch: AppDispatch) {
  try {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
    );
    const [company] = await response.json();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) throw new Error("Not authenticated");

    const { data: existing, error: checkError } = await supabase
      .from("user_portfolio")
      .select("id")
      .eq("user_id", user.id)
      .eq("symbol", company.symbol)
      .maybeSingle(); 

    if (checkError) throw checkError;
    if (existing) {
      console.warn("⚠️ Ticker already exists in portfolio");
      return; 
    }

    const { error: insertError } = await supabase.from("user_portfolio").insert([
      {
        user_id: user.id,
        symbol: company.symbol,
        company_name: company.companyName,
        price: company.price,
        sector: company.sector,
        industry: company.industry,
        description: company.description,
      },
    ]);

    if (insertError) throw insertError;

    const { data: updatedPortfolio, error: fetchError } = await supabase
      .from("user_portfolio")
      .select("*")
      .eq("user_id", user.id);

    if (fetchError) throw fetchError;

    dispatch(setPortfolioInfo(updatedPortfolio));

  } catch (error) {
    console.error("Error saving to Supabase:", error);
  }
}

// Retrieve the data from the user_portfolio data
export async function getUserPortfolio(dispatch: AppDispatch) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("user_portfolio")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  dispatch(setPortfolioInfo(data));  
}

// Delete an Item from the Portfolio and Update the UI
export async function deleteItemPortfolio(dispatch: AppDispatch,id: string) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("Not authenticated");
  
  // Delete the portfolio item from the database
  const { error: deleteError } = await supabase
    .from("user_portfolio")
    .delete()
    .eq("id", id) 
    .eq("user_id", user.id); 

  if (deleteError) {
    throw deleteError;
  }

  const { data, error } = await supabase
    .from("user_portfolio")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw error;
  dispatch(setPortfolioInfo(data));
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
