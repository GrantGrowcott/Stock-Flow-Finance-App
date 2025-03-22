"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import StockGraph from "@/app/components/StockGraph";
import StockNamePrice from "@/app/components/StockNamePrice";
import StockDescription from "@/app/components/StockDescription";

const StockPage = () => {
  const company = usePathname().split("/").pop();

  useEffect(() => {
    console.log(company);
  }, [company]);

  return (
    <div className="p-3">
      <StockNamePrice symbol={company} />
      <div>
        <StockGraph symbol={company} />
        <StockDescription symbol={company} />
      </div>
    </div>
  );
};

export default StockPage;
