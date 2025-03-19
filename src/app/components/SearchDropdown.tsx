"use client";
import { useEffect } from "react";
import { TickerData } from "@/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { useRef } from "react";
import { SearchDropdownProps } from "@/constants";

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  activeIndex,
  setActiveIndex,
  tickerData
}) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
              onClick={() => router.push(`/company/${data.symbol}`)}
              onMouseEnter={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/company/${data.symbol}`);
                }
              }}
            >
              {data.symbol} - {data.name} {data.exchangeShortName}
            </li>
          ))
        ) : (
          <li className="p-2 text-[var(--darkGrey)] dark:text-[var(--white)]">
            No search results found
          </li>
        )}
      </ul>
    </div>
  );
};

export default SearchDropdown;
