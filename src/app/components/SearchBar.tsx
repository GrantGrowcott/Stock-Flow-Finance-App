"use client";
import ThemeToggle from "./ThemeToggle";
import CollapseMenu from "./CollapseMenu";

interface SearchBarProps {
  collapsed: boolean;
  toggleNavbar: () => void;
}

const SearchBar = ({ toggleNavbar, collapsed }: SearchBarProps) => {
  return (
    <div className="flex w-full h-20 p-4 dark:bg-[var(--darkGrey)] bg-[var(--white)]">
      <CollapseMenu toggleNavbar={toggleNavbar} collapsed = {collapsed}/>
      <input
        type="text"
        className="w-full p-2 rounded-md bg-[var(--grey)] text-[var(--black)] dark:text-[var(--white)] dark:bg-gray-700"
      />
      <ThemeToggle />
    </div>
  );
};

export default SearchBar;
