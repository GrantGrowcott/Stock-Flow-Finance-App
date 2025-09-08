import PortfolioSearch from "../components/PortfolioSearch";
import PortfolioData from "../components/PortfolioData";
import Head from "next/head";

const PortfolioTracker = () => {
  return (
    <>
      <Head>
        <title>Portfolio Tracker</title>
        <meta
          name="description"
          content="Users track businesses they currently own or wish to own in the future in an organized list."
        />
      </Head>
      <div>
        <PortfolioSearch />
        <PortfolioData />
      </div>
    </>
  );
};

export default PortfolioTracker;
