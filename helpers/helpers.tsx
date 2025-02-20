import { supabase } from "../lib/supabaseClient";
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
              redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            },
          });
  
    };

    export async function handleGithubLogin() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: "http://localhost:3000/auth/callback", // After Supabase processes login
        },
      });
    
      if (error) console.error("GitHub login error:", error);
    }
    
    
    
  
  
  