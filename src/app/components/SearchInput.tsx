import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setTickerState } from "../store/tickerSlice";
import { useState, useEffect } from "react";
import SearchDropdown from "./SearchDropdown";
import { getStockTicker } from "../api/api";
import { useRouter } from "next/navigation";
import { handleKeyDown } from "../../../helpers/helpers";

const SearchInput = () => {
  const dispatch = useDispatch();
  const ticker = useSelector((state: RootState) => state.ticker.ticker);
  const tickerData = useSelector((state: RootState) => state.ticker.tickerData);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); 
  const router = useRouter();

  useEffect(() => {
    getStockTicker(dispatch, ticker);
  }, [dispatch, ticker]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={ticker}
        onChange={(e) => {
          dispatch(setTickerState(e.target.value.toUpperCase()));
          setActiveIndex(-1); 
        }}
        onKeyDown={(e) => handleKeyDown(e, tickerData, router, setActiveIndex, setIsFocused, activeIndex )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder="Search Tickers"
        className="w-full p-2 rounded-md bg-[var(--grey)] dark:bg-[var(--blue)] text-[var(--black)] dark:text-[var(--white)] placeholder-[var(--black)] dark:placeholder-[var(--grey)]uppercase"
      />
      {isFocused && ticker.trim() !== "" && (
        <SearchDropdown
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          tickerData={tickerData} 
        />
      )}
    </div>
  );
};

export default SearchInput;
