"use client";

import { useRouter } from "next/navigation"; 
import { LogoutUser } from "../../../helpers/helpers";

const Logout = () => {
  const router = useRouter();
  
  return (
    <button onClick={() => LogoutUser(router)} className="bg-black p-4 rounded-md">
      <h3 className="text-white">Logout</h3>
    </button>
  );
};

export default Logout;
