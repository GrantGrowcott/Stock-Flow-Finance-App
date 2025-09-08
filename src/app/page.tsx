"use client";
import NewsWidget from "./components/NewsWidget";
// import TrendingStocks from "./components/TrendingStocks";


export const metadata = {
  title: "Stock Flow",
  description:
    "Home page of the Stock Flow App - track your portfolio, analyze stocks, and manage your finances with ease.",
};

function HomePage() {
  return (
    <>
      <div className="flex content-center justify-center p-7 gap-5 max-[900px]:flex-col">
        <NewsWidget />
        {/* This has been commented out of the home page because they only allow this through the paid API. I will consider uncommenting with paid customers when the time is right. */}
        {/* <TrendingStocks /> */}
      </div>
    </>
  );
}

export default HomePage;
