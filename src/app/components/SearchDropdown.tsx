import { useSelector } from "react-redux";
import { RootState } from "../store";
import { TickerData } from "../store/tickerSlice";



    const SearchDropdown = () => {

      const tickerData = useSelector((state: RootState) => state.ticker.tickerData);

        return (
          <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
            <ul>
            {tickerData.length > 0 ? (
              tickerData.map((data: TickerData, index: number) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {data.symbol} - {data.exchangeShortName}
                  
                </li>
              ))
              ) : (
                <li className="p-2">No search results found</li>
              )}
            
            </ul>
          </div>
        );
      };
      
      export default SearchDropdown;
    

