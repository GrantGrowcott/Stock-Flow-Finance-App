"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import StockGraph from "@/app/components/StockGraph";
import StockNamePrice from "@/app/components/StockNamePrice";
import KeyFinancialStats from "@/app/components/KeyFinancialStats";

const StockPage = () => {
  const company = usePathname().split("/").pop();

  useEffect(() => {
    console.log(company);
  }, [company]);

  return (
    <div className="p-3">
      <div >
        <StockNamePrice symbol={company} />
        <StockGraph symbol={company} />
      </div>
      {/* <StockDescription symbol={company} /> */}
      <KeyFinancialStats symbol={company}/>
    </div>
  );
};

export default StockPage;
