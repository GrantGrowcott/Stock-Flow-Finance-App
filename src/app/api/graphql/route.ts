import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { PriceHistory } from "@/constants";
import { StockInformation } from "@/constants";

// Define GraphQL schema
const typeDefs = gql`

  type PriceHistory {
    date: String!
    close: Float!
    volume: Int!
  }

 type StockInformation {
    symbol : String!
    price: Float!
    mktCap: Float!
    companyName: String!
    currency: String!
    exchangeShortName: String!
    industry: String!
    description: String!
    dcfDiff: Float!
    dcf: Float!
    image: String!
  }

type Query {
  getStockInformation(symbol: String!): StockInformation 
  getPriceHistory(symbol: String!): [PriceHistory]
}
`;

// Fetch data from the FMP REST API
const resolvers = {
    Query: {
      getPriceHistory: async (_: unknown, { symbol }: { symbol: string }) => {
        // Ensure the symbol is valid before making the request
        if (!symbol) {
          throw new Error("Symbol is required");
        }
  
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
        );
        const data = await response.json();
  
        // Ensure that the response contains the historical data
        if (!data || !data.historical) {
          throw new Error("No historical data found for symbol: " + symbol);
        }
  
        return data.historical.map((item: PriceHistory) => ({
          date: item.date,
          close: item.close,
          volume: item.volume,
        }));
      },getStockInformation: async (_: unknown, { symbol }: { symbol: string }): Promise<StockInformation | null> => {
            try {
              // Validate API key presence
              if (!process.env.NEXT_PUBLIC_FINANCIAL_API_KEY) {
                throw new Error('Financial API key is not configured');
              }
          
              const response = await fetch(
                `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`
              );
          
              // Check for HTTP errors
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const data = await response.json();
          
              // Validate response structure
              if (!Array.isArray(data) || !data.length) {
                throw new Error('Invalid response format: No stock data found');
              }
          
              const stock = data[0];
          
              return {
                symbol : stock.symbol,
                price: Number(stock.price),
                mktCap: Number(stock.mktCap),
                companyName: stock.companyName,
                currency: stock.currency || '',
                exchangeShortName: stock.exchangeShortName || '',
                industry: stock.industry || '',
                description: stock.description || '',
                dcfDiff: Number(stock.dcfDiff || 0),
                dcf: Number(stock.dcf || 0),
                image: stock.image || ''
              };
            } catch (error) {
              console.error('Error fetching stock information:', error);
              return null;
            }
          },
    },
  };
  

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
