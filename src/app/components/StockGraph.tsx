// StockGraph.tsx
import { useQuery } from "@apollo/client";
import { GET_PRICE_HISTORY, SymbolProps } from "@/constants";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import GraphButtons from "./GraphButtons";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { chartData } from "../api/api";
import { useTheme } from "../context/ThemeContext";  

const StockGraph = ({ symbol }: SymbolProps) => {
  const activeTime = useSelector((state: RootState) => state.ticker.activeTime);
  const { data, loading, error, refetch } = useQuery(GET_PRICE_HISTORY, {
    variables: { symbol, activeTime },
    fetchPolicy: "network-only",
  });
  const { darkMode } = useTheme();
  

  useEffect(() => {
    if (symbol && activeTime) {
      refetch({ symbol, activeTime });
    }
  }, [symbol, activeTime, refetch]);

  if (loading) return <p>Loading stock data...</p>;
  if (error) return <p>Error fetching data.</p>;

  return (
    <>
      <div className="mt-5 flex-1 h-[200px]" >
        <GraphButtons />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData(data.getPriceHistory, activeTime)}>
            <XAxis 
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              tick={{ fill: darkMode ? "white" : "black" }}
            />
            <YAxis domain={["auto", "auto"]} tick={{ fill: darkMode ? "white" : "black" }}/>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="close"
              stroke="var(--blue)"
              strokeWidth={2}
              dot={false}
            
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StockGraph;
