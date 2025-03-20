import { useQuery } from "@apollo/client";
import { GET_PRICE_HISTORY } from "@/constants";
import { PriceHistory } from "@/constants";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import GraphButtons from "./GraphButtons";

const StockGraph = ({ symbol }: { symbol: string | undefined }) => {
  const { data, loading, error } = useQuery(GET_PRICE_HISTORY, {
    variables: { symbol },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

  
  const chartData = data.getPriceHistory
  .slice() 
  .reverse()
  .map((item: PriceHistory) => ({
    date: item.date,
    close: item.close,
  }));

  return (
    <>
    <div className="mt-5" style={{ width: "50%", height: 300 }}>
    <GraphButtons />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()}  />
          <YAxis domain={["auto", "auto"]}  />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </>
  );
};

export default StockGraph;
