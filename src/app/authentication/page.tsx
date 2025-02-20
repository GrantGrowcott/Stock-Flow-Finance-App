// To see the array displayed, go the http://localhost:3000/authentication. I had to set specific permissions in supabase to allow everyone to read the data regardless of their authentication status.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Instruments() {
  const { data: authentication, error } = await supabase.from("authentication").select();

  if (error) {
    return <pre>Error: {error.message}</pre>;
  }

  return <pre>{JSON.stringify(authentication, null, 2)}</pre>;
}
