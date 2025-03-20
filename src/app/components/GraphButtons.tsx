const GraphButtons = () => {
  return (
    <div className="flex justify-end">
      <button className="p-1 bg-[var(--white)] dark:bg-[var(--grey)] dark:text-[var(--black)]  rounded-md mr-3 ">3m</button>
      <button className="p-1 bg-[var(--white)] dark:bg-[var(--grey)] dark:text-[var(--black)]  rounded-md mr-3 ">6m</button>
      <button className="p-1 bg-[var(--white)] dark:bg-[var(--grey)] dark:text-[var(--black)]  rounded-md mr-3 ">1y</button>
      <button className="p-1 bg-[var(--white)] dark:bg-[var(--grey)] dark:text-[var(--black)]  rounded-md mr-3 ">5y</button>
    </div>
  );
};

export default GraphButtons;
