import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setTickerState } from "../store/tickerSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchDropdown from "./SearchDropdown";
import { useEffect } from "react";
import { getStockTicker } from "../api/api";

const SearchInput = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const ticker = useSelector((state: RootState) => state.ticker.ticker);
  const [isFocused, setIsFocused] = useState(false);

 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && ticker.trim() !== "") {
      router.push(`/company/${ticker}`);
      setIsFocused(false); // Hide dropdown after search
    }
  };

  useEffect(() => {
    getStockTicker(dispatch, ticker);
  }, [dispatch, ticker]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={ticker}
        onChange={(e) => dispatch(setTickerState(e.target.value.toUpperCase()))}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        placeholder="Search Tickers"
        className="w-full p-2 rounded-md bg-[var(--grey)] text-[var(--black)] placeholder-[var(--black)] dark:text-[var(--white)] dark:bg-[var(--black)] dark:placeholder-[var(--white)] uppercase"
      />
      {isFocused && ticker.trim() !== "" && <SearchDropdown />}
    </div>
  );
};

export default SearchInput;
