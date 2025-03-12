"use client";
import { useState } from "react";
import Image from "next/image";
import { handleGoogleLogin, handleGithubLogin } from "../../../helpers/helpers";
import { useRouter } from "next/navigation";
import { icons } from "@/constants";
import { handleSignIn } from "../../../helpers/helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url(/clouds.webp)] bg-cover">
      <Image
        src="/stock-flow-blue.png"
        width={icons.logoWidth}
        height={icons.logoHeight}
        priority = {true}
        className="absolute top-5 left-5"
        alt="Stock Flow Logo"
      />
      <div className="bg-gradient-to-t from-[var(--white)] to-[var(--lightBlue)] p-7 mx-5 rounded-2xl flex flex-col ">
        <Image src="/login-icon.png" alt="Logo" width={icons.login} height={icons.login} className="mb-5 mx-auto" />
        <h1 className="text-2xl font-bold text-center">Sign in with email </h1>
        <h2 className="max-w-md text-center mx-auto text text-[var(--lightGrey)]">
          Realize your investing and personal finance potential. For free
        </h2>
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
            className="w-full p-2 mb-2 rounded-md "
          />
        </div>
        <button onClick={() => router.push("/password-recovery")}>
          <h3 className="text-right">Forgot Password?</h3>
        </button>
        <button onClick={() => handleSignIn(email, password, router)} className="bg-[var(--black)] text-[var(--white)] py-3 px-4 rounded-md my-4 ">
          <h3>Login</h3>
        </button>
        <h4 className="mx-auto text-sm">Or sign in with</h4>
        <div className="flex align-items justify-around my-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center bg-[var(--white)] p-3 rounded-xl gap-2"
          >
            <Image src="/google.png" alt="Logo" width={icons.auth} height={icons.auth} className=" mx-auto" />
            <h3>Google</h3>
          </button>
          <button
            onClick={handleGithubLogin}
            className="flex items-center justify-center bg-[var(--white)] p-3 rounded-xl gap-2"
          >
            <Image src="/github.png" alt="Logo" width={icons.auth} height={icons.auth} className=" mx-auto" />
            <h3>Github</h3>
          </button>
        </div>
        <h4 className="mx-auto">
          Don&apos;t have an account?
          <button onClick={() => router.push("/register")} className="ml-1">
            <span className="text-[var(--blue)]">Sign Up</span>
          </button>
        </h4>
      </div>
    </div>
  );
};

export default Login;
