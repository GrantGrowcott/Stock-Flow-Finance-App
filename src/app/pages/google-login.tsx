import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
