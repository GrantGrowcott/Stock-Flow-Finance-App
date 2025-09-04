"use client";
import ThemeToggle from "./ThemeToggle";
import CollapseMenu from "./CollapseMenu";
import SettingsButton from "./SettingsButton";
import { NavbarProps } from "@/constants";
// import SearchInput from "./SearchInput";

const SearchBar = ({ toggleNavbar, collapsed }: NavbarProps) => {
  
  return (
    <div className="flex w-full h-20 p-4 dark:bg-[var(--darkGrey)] bg-[var(--white)]">
      <CollapseMenu toggleNavbar={toggleNavbar} collapsed={collapsed} />
      {/* Commented out the Search Input because searching tickers  */}
      {/* <SearchInput /> */}
      <ThemeToggle />
      <SettingsButton />
    </div>
  );
};

export default SearchBar;
