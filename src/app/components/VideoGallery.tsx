"use client";

interface Props {
  videoUrls: string[];
}

export default function VideoGallery({ videoUrls }: Props) {
  if (!videoUrls.length) return <div>No videos found</div>;

  return (
    <div className="p-6 space-y-6">
      {videoUrls.map((url, i) => (
        <div key={i} className="rounded-xl shadow-md p-4">
          <video controls controlsList="nodownload" className="w-full rounded-lg">
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}
