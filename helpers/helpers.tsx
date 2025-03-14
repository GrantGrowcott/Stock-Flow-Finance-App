import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { Stock } from "@/constants";

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

// Retrieves Market News to be displayed on the home page
export async function getNews() {
  try {
    const response = await fetch("https://newsapi.org/v2/top-headlines?category=business&apiKey=ee4c5c77acfc417f97d6ec65e8c8eb5c");
    const data = await response.json();

    if (Array.isArray(data.articles)) {
      return data; 
    } else {
      console.error("Expected articles array but got:", data);
      return { articles: [] }; 
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    return { articles: [] }; 
  }
}

// Retrieves the most active, gainers and losers from the stock market each day.
export async function getStockData( setStockData: React.Dispatch<React.SetStateAction<Stock[]>>, setActiveData: Dispatch<SetStateAction<string>>, category:string) {

  if (category === "Active") {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM`);
      const data = await response.json();
      setStockData(data);
      setActiveData("Active");
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setStockData([]);
    }
  }
  else if (category === "Gainers") {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM`);
      const data = await response.json();
      setStockData(data);
      setActiveData("Gainers");
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setStockData([]);
    }
  }
  else if (category === "Losers") {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=qKbye2ChaZdQ6BoVhnYPGb8ZzWj45ShM`);
      const data = await response.json();
      setStockData(data);
      setActiveData("Losers");
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setStockData([]);
    }
  }
}




  
