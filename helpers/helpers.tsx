"use client";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

// const apiKey = process.env.NEXT_PUBLIC_FINANCIAL_API_KEY;

// This is the link to the api endpoint for me to call each time
// https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements

// This function is invoked when ready to use the actual api endpoint.You have only 250 api calls per day on the free plan. Replace mockStocks on line 29 with getStocks().

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
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://igcwcmptatreplhpyico.supabase.co/auth/v1/callback`,
    },
  });
};

export async function handleGithubLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `https://igcwcmptatreplhpyico.supabase.co/auth/v1/callback`,
    },
  });
  if (error) console.error("OAuth sign-in error:", error);
}


export async function emailSignIn(email: string, password: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log("Hi");

    if (error) {
      console.error("Error signing in:", error.message); 
      return false; // Return false if there's an error
    }

    // Return true if sign-in is successful
    return true;
  } catch (error) {
    console.error("Unexpected error signing in:", error);
    return false; // Return false for unexpected errors
  }
}

export async function recoverEmailPassword(email: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/password-reset',
    })

    if (error) {
      console.error("Error signing in:", error.message); 
      return false; // Return false if there's an error
    }

    // Return true if sign-in is successful
    return true;
  } catch (error) {
    console.error("Unexpected error signing in:", error);
    return false; // Return false for unexpected errors
  }
}

export async function resetEmailPassword(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      console.error("Error resetting password:", error.message);
      return { success: false, error: error.message }; // Return error message
    }

    return { success: true }; // Return success
  } catch (error) {
    console.error("Unexpected error resetting password:", error);
    return { success: false, error: (error as Error).message }; // Return unexpected error
  }
}


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
      console.error("Error signing up:", error.message); // Log the error message
      return false; // Return false if there's an error
    }
    
    return true; // Return true if sign-up is successful
  } catch (error) {
    console.error("Error signing up:", error);
    return false; // Return false for unexpected errors
  }
}





export  const LogoutUser = async (router: ReturnType<typeof useRouter>) => {
  try {
    await supabase.auth.signOut();
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
