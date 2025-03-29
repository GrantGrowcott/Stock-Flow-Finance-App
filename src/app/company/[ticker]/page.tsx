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
    <div className="h-[calc(100vh-5rem)] flex flex-col p-3">

      
      {/* Fixed Navbar Section */}
      <div className="flex-shrink-0">
        <StockNamePrice symbol={company} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto">
        <StockGraph symbol={company} />
        <KeyFinancialStats symbol={company} />
      </div>

    </div>
  );
};

export default StockPage;
