import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setActiveTime } from "../store/tickerSlice";

const GraphButtons = () => {
  const activeTime = useSelector((state: RootState) => state.ticker.activeTime);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-end">
      <button
        onClick={() => dispatch(setActiveTime("3m"))}
        className={`p-1 rounded-md mr-3 
      ${
        activeTime === "3m"
          ? "bg-[var(--blue)] text-[var(--white)]"
          : "bg-[var(--white)] dark:bg-[var(--grey)] dark:text-[var(--black)]"
      }
    `}
      >
        3m
      </button>
      <button
        onClick={() => dispatch(setActiveTime("6m"))}
        className={`p-1 rounded-md mr-3 
      ${
        activeTime === "6m"
          ? "bg-[var(--blue)] text-[var(--white)]"
          : "bg-[var(--white)] dark:bg-[var(--grey)] dark:text-[var(--black)]"
      }
    `}
      >
        6m
      </button>
      <button
        onClick={() => dispatch(setActiveTime("1y"))}
        className={`p-1 rounded-md mr-3 
      ${
        activeTime === "1y"
          ? "bg-[var(--blue)] text-[var(--white)]"
          : "bg-[var(--white)] dark:bg-[var(--grey)] dark:text-[var(--black)]"
      }
    `}
      >
        1y
      </button>
      <button
        onClick={() => dispatch(setActiveTime("5y"))}
        className={`p-1 rounded-md mr-3 
      ${
        activeTime === "5y"
          ? "bg-[var(--blue)] text-[var(--white)]"
          : "bg-[var(--white)] dark:bg-[var(--grey)] dark:text-[var(--black)]"
      }
    `}
      >
        5y
      </button>
    </div>
  );
};

export default GraphButtons;
