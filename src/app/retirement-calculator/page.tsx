import RetirementCalculation from "../components/RetirementCalculation";

export const metadata = {
  title: "Retirement Calculator",
  description:
    "Retirement calculator to understand how much money a person will have when they retire and the money left over when they estimate passing away.",
};
const RetirementCalculator = () => {
  return (
    <div className=" h-[calc(100vh-5rem)] overflow-y-auto p-3">
      <RetirementCalculation />
    </div>
  );
};

export default RetirementCalculator;
