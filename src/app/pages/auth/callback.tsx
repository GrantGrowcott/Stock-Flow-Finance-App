import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../../lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Auth session error:", error.message);
      } else {
        console.log("User session:", data);
        router.push("/dashboard"); // Redirect user to the dashboard
      }
    }

    getSession();
  }, [router]);

  return <p>Authenticating...</p>;
}
