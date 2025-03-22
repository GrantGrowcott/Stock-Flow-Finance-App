
import { gql } from "@apollo/client";
export const icons = {
    nav: 30,
    logoWidth: 200,
    logoHeight: 100,
    profile: 50,
    login: 50,
    settings: 35,
    theme: 40,
    auth: 40,
}

export interface NavbarProps {
    collapsed: boolean;
    toggleNavbar: () => void;
  }

export interface NewsArticle {
    title: string;
    url: string;
    author?: string;
    source: {
      name: string;
    };
    description: string;
    publishedAt?: string;
    content: string;
  }

  export interface Stock {
    symbol: string;
    name: string;
    change: number;
    price: number;
    changesPercentage: number;
  }

  export interface TickerData {
    symbol : string;
    name: string;
    currency: string;
    exchangeShortName: string
  }

  export interface SearchDropdownProps {
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    tickerData: TickerData[];
  }

  export interface PriceHistory {
    date: string;
    close: number;
    volume: number;
  }

  export type SymbolProps = {
    symbol: string | undefined;
  }

  export interface StockInformation {
    symbol : string;
    price: number;
    mktCap: number;
    companyName: string;
    currency: string;
    exchangeShortName: string;
    industry: string;
    description: string;
    dcfDiff: number;
    dcf: number;
    image: string;
  }


export const GET_PRICE_HISTORY = gql`
  query GetPriceHistory($symbol: String! ) {
    getPriceHistory(symbol: $symbol) {
      date
      close
      volume
    }
  }
`;

export const GET_STOCK_INFORMATION = gql`
  query GetStockInformation($symbol: String!) {
    getStockInformation(symbol: $symbol) {
      symbol
      price
      mktCap
      companyName
      currency
      exchangeShortName
      industry
      description
      dcfDiff
      dcf
      image
    }
  }
`;





