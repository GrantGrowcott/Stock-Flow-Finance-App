import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { PriceHistory } from "@/constants";

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

const resolvers = {
    Query: {
      getPriceHistory: async ( args: { symbol: string }) => {
        try {
          const { symbol } = args;
          const apiKey = process.env.NEXT_PUBLIC_FINANCIAL_API_KEY;
          const response = await fetch(
            `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${apiKey}`
          );
  
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
          }
  
          const data = await response.json();
          if (!data || !data.historical) {
            console.error("No historical data found.");
            return [];
          }
  
          return data.historical.map((item: PriceHistory) => ({
            date: item.date,
            close: item.close,
            volume: item.volume,
          }));
        } catch (error) {
          console.error("Error fetching historical price data:", error);
          return [];
        }
      },
    },
  };
  
  

const server = new ApolloServer({ typeDefs, resolvers });
export default startServerAndCreateNextHandler(server);
