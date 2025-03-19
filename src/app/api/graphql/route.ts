import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { PriceHistory } from "@/app/components/StockGraph";

// Define GraphQL schema
const typeDefs = gql`
  type PriceHistory {
    date: String
    close: Float
    volume: Int
  }

  type Query {
    getPriceHistory(symbol: String!): [PriceHistory]
  }
`;

// Fetch data from the FMP REST API
const resolvers = {
    Query: {
      getPriceHistory: async (_: any, { symbol }: { symbol: string }) => {
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
      },
    },
  };
  

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
