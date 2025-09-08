"use client";
import Image from "next/image";
import { useState } from "react";
import { handleSignUp } from "../../../helpers/helpers";
import { icons } from "@/constants";

const PasswordRecoveryWidget = () => {
  
    const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<boolean | string>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url(/clouds.webp)] bg-cover">
      <div className="bg-gradient-to-t from-[var(--white)] to-[var(--lightBlue)] p-7 mx-5 rounded-2xl flex flex-col ">
        <Image src="/login-icon.png" alt="Logo" width={icons.login} height={icons.login} className="mb-5 mx-auto" />
        <h1 className="text-2xl font-bold text-center text-[var(--white)] drop-shadow-md">Reset your password </h1>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 rounded-md "
          />
        </div>

        <button
          onClick={() => handleSignUp(password, setSuccessMessage, setErrorMessage)}
          className="bg-[var(--black)] text-[var(--white)] py-3 px-4 rounded-md my-4"
        >
          <h3>Reset</h3>
        </button>
        {successMessage && (
          <p className="text-[var(--green)]text-center mt-4">
            Check your email to reset your password. The email can take 2-3 minutes to be received.
          </p>
        )}
        {errorMessage && <p className="text-[var(--red)] text-center mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PasswordRecoveryWidget;
