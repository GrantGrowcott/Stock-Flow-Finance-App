import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { setAuthPage } from "@/app/store/userSlice";

// const apiKey = process.env.NEXT_PUBLIC_FINANCIAL_API_KEY;

// This is the link to the api endpoint for me to call each time
// https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements

// This function is invoked when ready to use the actual api endpoint.You have only 250 api calls per day on the free plan.

// async function getStocks() {
//   const res = await fetch(
//     `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${apiKey}`,
//     { cache: "no-store" } // Ensures fresh data on every request (SSR)
//   );
//   return res.json();
// }

//  Mock Data so that I don't have to pull from the api continuously (max of 250 api calls/day)
// const mockStocks = Array.from({ length: 5 }, (_, yearIndex) => {
//   const year = new Date().getFullYear() - yearIndex;
//   return {
//     symbol: "AAPL", // Example stock symbol
//     date: `${year}-12-31`, // Example: Dec 31st of each year
//     reportedCurrency: "USD",
//     fillingDate: `${year}-01-01`, // Assume filling date is the start of the year
//     revenue: (Math.random() * (500000000000 - 100000000000) + 100000000000).toFixed(0), // Random revenue between 100B and 500B
//   };
// });

// Authentication Logic for Google Sign in
export const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://igcwcmptatreplhpyico.supabase.co/auth/v1/callback`,
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
      redirectTo: `https://igcwcmptatreplhpyico.supabase.co/auth/v1/callback`,
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
      redirectTo: "http://localhost:3000/password-reset",
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
        emailRedirectTo: "https://igcwcmptatreplhpyico.supabase.co/auth/v1/callback",
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
    console.log("Authenticated user:", data.user);
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

export const pageRedirect = (page: "register" | "login" | "password-recovery", dispatch: Dispatch , router: ReturnType<typeof useRouter>) => {
  dispatch(setAuthPage(page));  
  router.push(`/${page}`);  
};