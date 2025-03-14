// import { useSelector } from "react-redux";
// import { RootState } from "../store";


    // const ticker = useSelector((state: RootState) => state.ticker.ticker);
    
    const SearchDropdown = () => {
        return (
          <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
            <ul>
              <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                AAPL - Apple Inc.
              </li>
              <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                TSLA - Tesla Inc.
              </li>
              <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                MSFT - Microsoft Corp.
              </li>
            </ul>
          </div>
        );
      };
      
      export default SearchDropdown;
      

 
// https://financialmodelingprep.com/api/v3/search-ticker?query=AA&limit=10&apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM

