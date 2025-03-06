"use client";
import { useRouter } from "next/navigation"; 
import { LogoutUser } from "../../../helpers/helpers";
const Logout = () => {
  const router = useRouter();
  return (
    <button onClick={() => LogoutUser(router)} className="bg-[var(--black)] p-4 rounded-md mt-3">
      <h3 className="text-[var(--white)]">Logout</h3>
    </button>
  );
};

export default Logout;

