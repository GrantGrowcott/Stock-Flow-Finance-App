import { useQuery } from "@apollo/client";
import { GET_STOCK_INFORMATION } from "@/constants";
import { SymbolProps } from "@/constants";

const StockDescription = ({ symbol }: SymbolProps) => {
  const { data, error } = useQuery(GET_STOCK_INFORMATION, {
    variables: { symbol },
  });

  if (error) return <p>Error fetching data.</p>;
  if (!data || !data.getStockInformation) {
    return <p>No stock information available.</p>;
  }

  const stock = data.getStockInformation;

  return (
    <div className="mt-5 bg-[var(--white)] rounded-xl p-10 dark:bg-[var(--darkGrey)]">
      <h3 className="text-center font-bold text-2xl">Company Profile</h3>
      <h3>{stock.description}</h3>
    </div>
  );
};

export default StockDescription;
