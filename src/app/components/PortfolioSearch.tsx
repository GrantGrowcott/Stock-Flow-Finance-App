"use client";
import { useState, useRef } from "react";
import { handlePortfolioKeyDown } from "../../../helpers/helpers";
import debounce from "lodash.debounce";
import { TickerData } from "@/constants";
import { getPortfolioTicker } from "../api/api";
import PortfolioDropdown from "./PortfolioDropdown";



const PortfolioSearch = () => {

  const[ticker, setTickerState] = useState<string>("")
  const [tickerData, setTickerData] = useState<TickerData[]>([])
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);


   const debounceRef = useRef(debounce((searchTerm: string) => {
      if (searchTerm.trim() !== "") {
        getPortfolioTicker(setTickerData, searchTerm);
      } else {
        setTickerData([]); 
      }
    }, 300)); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setTickerState(value);
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
            onKeyDown={(e) => handlePortfolioKeyDown(e, tickerData, setActiveIndex, setIsFocused, activeIndex)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Add to Portfolio"
            className="w-full p-2 rounded-md bg-[var(--grey)] dark:bg-[var(--blue)] text-[var(--black)] dark:text-[var(--white)] placeholder-[var(--black)] dark:placeholder-[var(--grey)]uppercase"
          />
          {isFocused && ticker.trim() !== "" && (
            <PortfolioDropdown activeIndex={activeIndex} setActiveIndex={setActiveIndex} tickerData={tickerData} />
          )}
        </div>
      );
}
 
export default PortfolioSearch;