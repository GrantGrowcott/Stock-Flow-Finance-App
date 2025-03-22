import { useQuery } from "@apollo/client"
import { GET_STOCK_INFORMATION } from "@/constants"
import { SymbolProps } from "@/constants"

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
        <div>{stock.description}</div>
      )
}



export default StockDescription