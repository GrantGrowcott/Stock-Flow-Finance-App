import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setTickerState, setTickerData } from "../store/tickerSlice";
import { useState, useRef } from "react";
import SearchDropdown from "./SearchDropdown";
import { getStockTicker } from "../api/api";
import { useRouter } from "next/navigation";
import { handleKeyDown } from "../../../helpers/helpers";
import debounce from "lodash.debounce";

const SearchInput = () => {
  const dispatch = useDispatch();
  const ticker = useSelector((state: RootState) => state.ticker.ticker);
  const tickerData = useSelector((state: RootState) => state.ticker.tickerData);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();

  // UseRef to persist debounced function across re-renders
  const debounceRef = useRef(debounce((searchTerm: string) => {
    if (searchTerm.trim() !== "") {
      getStockTicker(dispatch, searchTerm);
    } else {
      dispatch(setTickerData([])); // Clear results if input is empty
    }
  }, 300)); // 300ms debounce delay

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    dispatch(setTickerState(value));
    setActiveIndex(-1);

    // Call debounced API request
    debounceRef.current(value);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={ticker}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, tickerData, router, setActiveIndex, setIsFocused, activeIndex)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder="Search Tickers"
        className="w-full p-2 rounded-md bg-[var(--grey)] dark:bg-[var(--blue)] text-[var(--black)] dark:text-[var(--white)] placeholder-[var(--black)] dark:placeholder-[var(--grey)]uppercase"
      />
      {isFocused && ticker.trim() !== "" && (
        <SearchDropdown activeIndex={activeIndex} setActiveIndex={setActiveIndex} tickerData={tickerData} />
      )}
    </div>
  );
};

export default SearchInput;
