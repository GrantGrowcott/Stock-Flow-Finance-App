import RetirementCalculation from "../components/RetirementCalculation";
import Head from "next/head";

const RetirementCalculator = () => {
  return (
    <>
      <Head>
        <title>Retirement Calculator</title>
        <meta
          name="description"
          content="Retirement calculator to understand how much money a person will have when they retire and the money left over when they estimate passing away."
        />
      </Head>
      <div className=" h-[calc(100vh-5rem)] overflow-y-auto p-3">
        <RetirementCalculation />
      </div>
    </>
  );
};

export default RetirementCalculator;
