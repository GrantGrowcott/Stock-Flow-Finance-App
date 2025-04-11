"use client";
import { useEffect, useState } from "react";
import { getUserPortfolio } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteItemPortfolio } from "../api/api";

const PortfolioData = () => {
  const portfolioData = useSelector((state: RootState) => state.portfolio.portfolioData); 
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        await getUserPortfolio(dispatch); // Wait for the dispatch to complete
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchPortfolio(); // Call the async function
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
  
    try {
      console.log("Trying to delete:", id);
      await deleteItemPortfolio(dispatch, id);
      console.log("✅ Successfully deleted");
    } catch (err: any) {
      console.error("❌ Failed to delete item:", err);
      setError(err.message || "Failed to delete item");
    } finally {
      setLoading(false);
    }
  };
  
  

  if (loading) return <div>Loading portfolio...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Portfolio</h2>
      {portfolioData.length === 0 ? (
        <p>No stocks in your portfolio yet.</p>
      ) : (
        <ul className="space-y-4">
          {portfolioData.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">
                {item.symbol} — {item.company_name}
              </h3>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong>Sector:</strong> {item.sector}</p>
              <p><strong>Industry:</strong> {item.industry}</p>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              <button
                onClick={() => handleDelete(item.id)}
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
