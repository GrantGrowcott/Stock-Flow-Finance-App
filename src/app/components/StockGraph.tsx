import { useQuery, gql } from "@apollo/client";


export interface PriceHistory {
    date: string;
    close: number;
    volume: number;
}

const GET_PRICE_HISTORY = gql`
  query GetPriceHistory($symbol: String!) {
    getPriceHistory(symbol: $symbol) {
      date
      close
      volume
    }
  }
`;


const StockGraph = ({ symbol }: { symbol: string | undefined }) => {

    
    const { data, loading, error } = useQuery(GET_PRICE_HISTORY, {
      variables: { symbol }, // <-- This is how symbol is passed to the backend
    });
    if (!symbol) {
        return <p>No symbol provided.</p>;
      }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data.</p>;
  
    return (
      <div>
        {data.getPriceHistory.map((item: PriceHistory, index: number) => (
          <div key={index}>
            <p>Date: {item.date}</p>
            <p>Close: {item.close}</p>
            <p>Volume: {item.volume}</p>
          </div>
        ))}
      </div>
    );
  };

export default StockGraph;
