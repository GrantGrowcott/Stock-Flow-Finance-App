import { supabase } from "../../../lib/supabaseClient";
// To see the array displayed, go to http://localhost:3000/database. I had to set specific permissions in supabase to allow everyone to read the data regardless of their authentication status.


export default async function Instruments() {
  const { data, error } = await supabase.from("authentication").select();

  if (error) {
    return <pre>Error: {error.message}</pre>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
