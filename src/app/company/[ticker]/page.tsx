"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import StockGraph from "@/app/components/StockGraph";

const StockPage = () => {
  const company = usePathname().split("/").pop();

  useEffect(() => {
    console.log(company);
  }, [company]);

  return <div className="z-1"><StockGraph symbol = {company}/></div>;
};

export default StockPage;
