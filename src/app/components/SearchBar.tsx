const SearchBar = () => {
  return (
    <div className="flex w-full h-20 p-4 dark:bg-[var(--darkGrey)] bg-[var(--white)]">
      <input
        type="text"
        className="w-full p-2  rounded-md bg-[var(--grey)] text-[var(--black)] dark:text-[var(--white)] dark:bg-gray-700  "
      />
    </div>
  );
};

export default SearchBar;
