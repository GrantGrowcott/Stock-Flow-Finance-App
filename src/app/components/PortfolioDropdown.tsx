"use client";
import { useEffect } from "react";
import { TickerData } from "@/constants";
import React from "react";
import { useRef } from "react";
import { SearchDropdownProps } from "@/constants";
import { setPortfolioData } from "../api/api";
import { useDispatch } from "react-redux";

const PortfolioDropdown: React.FC<SearchDropdownProps> = ({ activeIndex, setActiveIndex, tickerData }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown && activeIndex >= 0) {
      const activeItem = dropdown.children[activeIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  return (
    <div
      ref={dropdownRef}
      className="absolute w-full mt-1 bg-[var(--white)] dark:bg-[var(--darkGrey)] border border-[var(--grey)] dark:border-[var(--lightGrey)] rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
    >
      <ul>
        {tickerData.length > 0 ? (
          tickerData.map((data: TickerData, index: number) => (
            <li
              key={data.symbol || index}
              className={`p-2 cursor-pointer ${
                activeIndex === index
                  ? "bg-[var(--grey)] dark:bg-[var(--lightGrey)]"
                  : "hover:bg-[var(--lightBlue)] dark:hover:bg-[var(--darkGrey)]"
              }`}
              tabIndex={0}
              onClick={() => setPortfolioData( data.symbol, dispatch)}
              onMouseEnter={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPortfolioData(data.symbol, dispatch);
                }
              }}
            >
              {data.symbol} - {data.name} {data.exchangeShortName}
            </li>
          ))
        ) : (
          <li className="p-2 text-[var(--darkGrey)] dark:text-[var(--white)]">No search results found</li>
        )}
      </ul>
    </div>
  );
};

export default PortfolioDropdown;
