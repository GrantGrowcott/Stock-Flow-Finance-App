import { supabase } from "../lib/supabaseClient";

export async function fetchVideoUrls() {
  const { data: files, error } = await supabase.storage.from("videos").list();
  if (error) return [];

  return (
    files
      ?.filter((file) => file.name.match(/\.(mp4|mkv|webm)$/i))
      .map((file) => supabase.storage.from("videos").getPublicUrl(file.name).data.publicUrl) || []
  );
}
