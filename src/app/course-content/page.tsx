"use client"
import { useState } from "react";
import ScrollCourseContent from "../components/ScrollCourseContent";
import VideoGallery from "../components/VideoGallery";
import { Video } from "../components/ScrollCourseContent";


export default function CourseContent() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="flex h-[calc(100vh-5rem)] w-full">
      <ScrollCourseContent onSelectVideo={setSelectedVideo} />
      <VideoGallery video={selectedVideo} />
    </div>
  );
}
