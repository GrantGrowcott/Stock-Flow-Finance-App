import Image from "next/image";
import { SymbolProps } from "@/constants";
import { setPortfolioData } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { getUserPortfolio, deleteItemPortfolio } from "../api/api";
import { icons } from "@/constants";

const FavoriteStock = ({ symbol }: SymbolProps) => {
  const dispatch = useDispatch();
  const portfolioData = useSelector((state: RootState) => state.portfolio.portfolioData);

  const matchedItem = portfolioData?.find((item) => item.symbol === symbol);
  const isInPortfolio = Boolean(matchedItem);

  useEffect(() => {
    getUserPortfolio(dispatch);
  }, [dispatch]);

  const handleClick = () => {
    
    if (isInPortfolio && matchedItem?.id) {
      deleteItemPortfolio(dispatch,matchedItem.id);
    } else {
      setPortfolioData(symbol, dispatch);
    }
  };
  return (
    <button
    onClick={handleClick}
      className="flex items-center justify-start gap-4 mt-3 p-3 rounded-2xl hover:bg-[var(--white)] dark:hover:bg-[var(--darkGrey)]"
    >
      <h3 className="text-lg">
        {isInPortfolio ? "In Watch list" : "Add to Watch list"}
      </h3>
      <Image
        src={isInPortfolio ? "/heart.png" : "/plus.png"}
        alt={isInPortfolio ? "In Watch list" : "Add to Watch list"}
        width={icons.profile}
        height={icons.profile}
      />
    </button>
  );
};

export default FavoriteStock;
