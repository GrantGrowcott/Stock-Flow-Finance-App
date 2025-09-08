"use client";
import Image from "next/image";
import { useState } from "react";
import { handleEmailSignUp } from "../../../helpers/helpers";
import { icons } from "@/constants";
import Head from "next/head";

const EmailRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <>
      <Head>
        <title>Register</title>
        <meta
          name="description"
          content="Page to register the user for the Stock Flow Application."
        />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen bg-[url(/clouds.webp)] bg-cover">
        <div className="bg-gradient-to-t from-[var(--white)] to-[var(--lightBlue)] p-7 mx-5 rounded-2xl flex flex-col">
          <Image src="/login-icon.png" alt="Logo" width={icons.login} height={icons.login} className="mb-5 mx-auto" />
          <h1 className="text-2xl font-bold text-center text-[var(--white)] drop-shadow-md">
            Register for E-mail Sign in{" "}
          </h1>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 rounded-md "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-2 rounded-md"
            />
          </div>

          <button
            onClick={() => handleEmailSignUp(email, password, setSuccessMessage)}
            className="bg-[var(--black)] text-[var(--white)] py-3 px-4 rounded-md my-4"
          >
            <h3>Sign Up</h3>
          </button>
          {successMessage && <p className="text-[var(--green)] text-center mt-4">{successMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default EmailRegistration;
