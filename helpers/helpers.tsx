import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { TickerData } from "@/constants";
import { AppDispatch } from "@/app/store";
import { deleteItemPortfolio } from "@/app/api/api";
import { FinalValues, RetirementParams } from "@/constants";

// Authentication Logic for Google Sign in
export const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_CALLBACK}`,
    },
  });
  if (error) {
    console.error("Login Error:", error);
    return;
  }
};

// Authentication Logic for Github Sign in
export async function handleGithubLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_CALLBACK}`,
    },
  });
  if (error) console.error("OAuth sign-in error:", error);
}

// Authentication Logic for Email Sign in
export async function emailSignIn(email: string, password: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Error signing in:", error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Unexpected error signing in:", error);
    return false;
  }
}
// This function sends a link to the users email to perform password recovery, they are redirected to the  http://localhost:3000/password-reset end point to change their password
export async function recoverEmailPassword(email: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_PASSWORD_RESET}`,
    });
    if (error) {
      console.error("Error signing in:", error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Unexpected error signing in:", error);
    return false;
  }
}
// Changes the old password to the new password after being redirected from the email link
export async function resetEmailPassword(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error("Error resetting password:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error resetting password:", error);
    return { success: false, error: (error as Error).message };
  }
}

// Creating a new email based user
export async function signUpNewUser(email: string, password: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_CALLBACK}`,
      },
    });

    if (error) {
      console.error("Error signing up:", error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error signing up:", error);
    return false;
  }
}

// Logout the user
export const LogoutUser = async (router: ReturnType<typeof useRouter>) => {
  try {
    await supabase.auth.signOut();
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// Check if the user is authenticated and if so, set the user in state ( used on the home page)
export const checkAuth = async (
  router: ReturnType<typeof useRouter>,
  setUser: Dispatch<SetStateAction<User | null>>
) => {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    router.push("/login");
  } else {
    setUser(data.user);
  }
};

// Sets user data such as the profile picture and username based on dark mode and light mode
export const seeUserData = async (
  setProfileImage: React.Dispatch<React.SetStateAction<string>>,
  setUser: React.Dispatch<React.SetStateAction<string>>,
  darkMode: boolean
) => {
  const { data } = await supabase.auth.getUser();
  const image_url = data.user?.user_metadata?.avatar_url;
  const user_email = data.user?.user_metadata?.email;

  if (image_url || user_email) {
    setProfileImage(image_url);
    setUser(user_email);
  } else if (darkMode) {
    setProfileImage("/placeholder-white.png");
  } else {
    setProfileImage("/placeholder-black.png");
  }
};

// Toggles the Settings Modal ( contains the logout button)
export const toggleModal = (setIsOpen: Dispatch<SetStateAction<boolean>>) => {
  setIsOpen((prev) => !prev);
};

export const handleSignIn = async (email: string, password: string, router: ReturnType<typeof useRouter>) => {
  const success = await emailSignIn(email, password);
  if (success) {
    router.push("/");
  }
};

export const handleSignUp = async (
  password: string,
  setSuccessMessage: Dispatch<SetStateAction<string | boolean>>,
  setErrorMessage: Dispatch<SetStateAction<string>>
) => {
  const success = await recoverEmailPassword(password);
  if (success) {
    setSuccessMessage(true);
    setErrorMessage("");
  } else {
    setSuccessMessage(false);
    setErrorMessage("Password recovery failed. Please try again.");
  }
};

export const handlePassword = async (
  password: string,
  setSuccessMessage: Dispatch<SetStateAction<string>>,
  router: ReturnType<typeof useRouter>
) => {
  const result = await resetEmailPassword(password);

  if (result.success) {
    setSuccessMessage("Password successfully reset.");
    router.push("/login");
  } else {
    setSuccessMessage(`Password reset failed: ${result.error}`);
  }
};

export const handleEmailSignUp = async (
  email: string,
  password: string,
  setSuccessMessage: Dispatch<SetStateAction<string>>
) => {
  const success = await signUpNewUser(email, password);
  if (success) {
    setSuccessMessage("Check your email to verify signup.");
  } else {
    setSuccessMessage("");
  }
};

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  tickerData: TickerData[],
  router: ReturnType<typeof useRouter>,
  setActiveIndex: Dispatch<SetStateAction<number>>,
  setIsFocused: Dispatch<SetStateAction<boolean>>,
  activeIndex: number
) => {
  if (!tickerData.length) return;

  if (e.key === "ArrowDown") {
    setActiveIndex((prev) => (prev < tickerData.length - 1 ? prev + 1 : 0));
  } else if (e.key === "ArrowUp") {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : tickerData.length - 1));
  } else if (e.key === "Enter" && activeIndex >= 0) {
    router.push(`/company/${tickerData[activeIndex].symbol}`);
    setIsFocused(false);
  }
};

export async function handlePortfolioKeyDown(
  e: React.KeyboardEvent<HTMLInputElement>,
  tickerData: TickerData[],
  setActiveIndex: Dispatch<SetStateAction<number>>,
  setIsFocused: Dispatch<SetStateAction<boolean>>,
  activeIndex: number,
) {
  if (!tickerData.length) return;

  if (e.key === "ArrowDown") {
    setActiveIndex((prev) => (prev < tickerData.length - 1 ? prev + 1 : 0));
  } else if (e.key === "ArrowUp") {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : tickerData.length - 1));
  } else if (e.key === "Enter" && activeIndex >= 0) {
    
    setIsFocused(false);
  }
}
// Used to format any value that is above 1 million to present in the UI ( ex: Market Capitalization)
export const formatNumbers = (num: number): string => {
  if (num >= 1e12 || num <= -1e12) {
    return "$" + (num / 1e12).toFixed(2) + "T";
  } else if (num >= 1e9 || num <= -1e9) {
    return "$" + (num / 1e9).toFixed(2) + "B";
  } else if (num >= 1e6 || num <= -1e6) {
    return "$" + (num / 1e6).toFixed(2) + "M";
  }
  return " $" + num.toString();
};


export const handleDelete = async (setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<boolean | null | string>>, id: string, dispatch: AppDispatch) => {
    setLoading(true);
    setError(null);
    try {
      await deleteItemPortfolio(dispatch, id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("❌ Failed to delete item:", err.message);
        setError(err.message);
      } else {
        console.error("❌ Failed to delete item:", err);
        setError("Failed to delete item");
      }
    } finally {
      setLoading(false);
    }
  };


  export const displayValue = (value: number | null | undefined, format = true) =>
    value != null ? (format ? formatNumbers(value) : value) : "N/A";
  
  export const displayPercent = (value: number | null | undefined) =>
    value != null ? (value * 100).toFixed(2) + "%" : "N/A";
  



// DCF Calculation for evaluating a stock
export const calculateDCF = ({
  freeCashFlow,
  freeCashGrowth,
  terminalGrowthRate,
  wacc,
  sharesOutstanding,
  selectedYears,
}: {
  freeCashFlow: number;
  freeCashGrowth: number;
  terminalGrowthRate: number;
  wacc: number;
  sharesOutstanding: number;
  selectedYears: number;
}) => {
  let currentFCF = freeCashFlow;
  const freeGrowth = freeCashGrowth / 100;
  const rate = terminalGrowthRate / 100;
  const discount = wacc / 100;

  const projectedFCFs: number[] = [];

  for (let i = 0; i < selectedYears; i++) {
    if (i !== 0) currentFCF *= 1 + freeGrowth;
    projectedFCFs.push(currentFCF);
  }

  const discountedFCFs = projectedFCFs.map((fcf, i) => {
    return fcf / Math.pow(1 + discount, i + 1);
  });

  const finalYearFCF = projectedFCFs[projectedFCFs.length - 1];
  const terminalValue = (finalYearFCF * (1 + rate)) / (discount - rate);
  const discountedTerminalValue = terminalValue / Math.pow(1 + discount, selectedYears);

  const totalValue = discountedFCFs.reduce((sum, val) => sum + val, 0) + discountedTerminalValue;

  const perShareValue = totalValue / sharesOutstanding;
  return perShareValue;
};



export const calculateRetirement = ({
  principle,
  annualReturn,
  currentAge,
  retirementAge,
  monthlyContribution,
  withdraw,
  death,
}: RetirementParams): { retirementMoney: FinalValues[]; deathMoney: FinalValues[] } => {
  const ageDifference = retirementAge - currentAge;
  const monthlyReturn = annualReturn / 100 / 12;

  const retirementMoney: FinalValues[] = [];
  let balance = principle;

  for (let year = 0; year <= ageDifference; year++) {
    const months = year * 12;
    const partTwo = Math.pow(1 + monthlyReturn, months);
    const partThree = (monthlyContribution * (partTwo - 1)) / monthlyReturn;
    balance = principle * partTwo + partThree;
    retirementMoney.push({ age: currentAge + year, value: balance });
  }

  const deathMoney: FinalValues[] = [];
  for (let year = retirementAge; year <= death; year++) {
    balance = (balance - withdraw * 12) * (1 + annualReturn / 100);
    if (balance < 0) balance = 0;
    deathMoney.push({ age: year, value: balance });
  }

  return { retirementMoney, deathMoney };
};

export const checkDeathValue = (deathMoney: FinalValues[]): string => {
  const hasZero = deathMoney.some((entry) => entry.value === 0);
  return hasZero
    ? "⚠️ You will **not** have enough money in retirement. Consider reducing your withdrawals or finding more opportunistic investments"
    : "✅ Congratulations, you will have enough money in retirement!!!!";
};

// lib/valuationHelpers.ts

export const calculateValuation = (
  earningsPerShare: number,
  earningsGrowth: number,
  priceEarnings: number,
  discountRate: number,
  selectedYears: number
): string => {
  const futureEarnings =
    earningsPerShare * Math.pow(1 + earningsGrowth / 100, selectedYears);

  const futurePrice = futureEarnings * priceEarnings;

  const presentValue =
    futurePrice / Math.pow(1 + discountRate / 100, selectedYears);

  return "$" + presentValue.toFixed(2);
};
