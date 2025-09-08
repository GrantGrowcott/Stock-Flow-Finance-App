import PortfolioSearch from "../components/PortfolioSearch";
import PortfolioData from "../components/PortfolioData";

export const metadata = {
  title: "Portfolio Tracker",
  description: "Tracking the businesses of that users will like to purchase or currently own.",
};

const PortfolioTracker = () => {
  return (
      <div>
        <PortfolioSearch />
        <PortfolioData />
      </div>
  );
};

export default PortfolioTracker;
