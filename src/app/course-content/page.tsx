import { supabase } from "../../../lib/supabaseClient";
import VideoGallery from "../components/VideoGallery";

export default async function CourseContent() {

  const { data: files, error } = await supabase.storage.from("videos").list();

  if (error) {
    console.error("Error fetching videos:", error.message);
  }


  const urls =
    files
      ?.filter((file) => file.name.match(/\.(mp4|mkv|webm)$/i)) 
      .map(
        (file) =>
          supabase.storage.from("videos").getPublicUrl(file.name).data.publicUrl
      ) || [];

  return (
    <div className="h-[calc(100vh-5rem)] overflow-y-auto ">
      <VideoGallery videoUrls={urls} />
    </div>
  );
}
