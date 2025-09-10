import { Video } from "./ScrollCourseContent";
type VideoGalleryProps = {
  video: Video | null;
};

export default function VideoGallery({ video }: VideoGalleryProps) {
  if (!video) {
    return (
      <div className="p-6 w-full">
        <p className="text-gray-500">Select a video to start watching.</p>
      </div>
    );
  }

  const videoUrl = video.videoUrl;

  return (
    <div className="p-6 w-full">
      <h3 className="font-bold mb-2">{video.title}</h3>

      {videoUrl ? (
        <video
          controls
          controlsList="nodownload"
          className="w-full rounded-lg"
          src={`/api/video?id=${video.videoUrl}`} // use the video’s Drive file ID
        />
      ) : (
        <div>Loading {video.title}...</div>
      )}

      {video.pdfId && (
        <a
          href={`/api/video?id=${video.pdfId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-blue-600 underline"
        >
          View PDF
        </a>
      )}
    </div>
  );
}
