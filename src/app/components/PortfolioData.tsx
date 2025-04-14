"use client";
import { useEffect, useState } from "react";
import { getUserPortfolio } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { handleDelete } from "../../../helpers/helpers";

const PortfolioData = () => {
  const portfolioData = useSelector((state: RootState) => state.portfolio.portfolioData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        await getUserPortfolio(dispatch);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [dispatch]);

  if (loading) return <div>Loading portfolio...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-[calc(100vh-7.5rem)] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Your Portfolio</h2>
      <ul className="grid grid-cols-5 text-center font-bold">
        <li>Company Name</li>
        <li>Current Stock Price</li>
        <li>Sector</li>
        <li>Industry</li>
      </ul>
      {portfolioData.length === 0 ? (
        <p>No stocks in your portfolio yet.</p>
      ) : (
        <ul className="space-y-4">
          {portfolioData.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow grid grid-cols-5">
              <h3 className="text-lg font-semibold">
                {item.symbol} — {item.company_name}
              </h3>
              <p>
                <strong>Price:</strong> ${item.price}
              </p>
              <p>
                <strong></strong> {item.sector}
              </p>
              <p>
                <strong>Industry:</strong> {item.industry}
              </p>
              <button
                onClick={() => handleDelete(setLoading, setError, item.id, dispatch)}
                className="bg-[var(--red)] p-3 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PortfolioData;
