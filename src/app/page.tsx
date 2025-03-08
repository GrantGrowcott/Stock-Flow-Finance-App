"use client";

import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { checkAuth } from "../../helpers/helpers";
import { useRouter } from "next/navigation";

function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      await checkAuth(router, setUser);
    };

    verifyUser();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return <div>Home Page</div>;
}

export default HomePage;
