import { fetchVideoUrls } from "../../../helpers/videoHelpers";
import VideoGallery from "../components/VideoGallery";
import ScrollCourseContent from "../components/ScrollCourseContent";

export const metadata = {
  title: "Course Content",
  description:
    "Value Investing based course content to teach students how to invest link the greatest investors in the world.",
};

export default async function CourseContent() {
  const urls = await fetchVideoUrls();

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <div className="w-2/5 overflow-y-auto border-r">
        <ScrollCourseContent />
      </div>
      <div className="w-3/5 overflow-y-auto">
        <VideoGallery videoUrls={urls} />
      </div>
    </div>
  );
}
