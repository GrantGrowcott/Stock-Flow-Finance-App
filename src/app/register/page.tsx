"use client"
import Image from "next/image";
import { useState } from "react";
import { signUpNewUser } from "../../../helpers/helpers";

const EmailRegistration = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[url(/clouds.webp)] bg-cover">
        <div className="bg-gradient-to-t from-white to-[#9ac8e7] p-7 mx-5 rounded-2xl flex flex-col ">
          <Image src="/login-icon.png" alt="Logo" width={50} height={50} className="mb-5 mx-auto" />
          <h1 className="text-2xl font-bold text-center">Register for E-mail Sign in </h1>
          
          <div className="mt-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
  
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
         
          <button onClick={() => signUpNewUser(email, password)} className="bg-[var(--black)] text-white py-3 px-4 rounded-md my-4 ">
            <h3>Sign Up</h3>
          </button>
        </div>
      </div>
    );
};

export default EmailRegistration;

