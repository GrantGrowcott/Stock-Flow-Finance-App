"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export type Video = {
  id: string;
  title: string;
  videoUrl: string;  
  pdfId?: string;    
};


type Section = {
  number: number;
  title: string;
  videos: Video[];
};

interface Props {
  onSelectVideo: (video: Video) => void;
}

const sections: Section[] = [
  {
    number: 1,
    title: "Welcome",
    videos: [
      {
        id: "intro",
        title: "Introduction to the Program",
        videoUrl: "1eGqrsBEccOlasB7YRrJoS-0GHx2bOXpa",
        pdfId: "1aJmkzp_XmFbVeXAb1wWFhf4urxTCOTAb",
      },
    ],
  },
  {
    number: 2,
    title: "Investing Part 1: Principles",
    videos: [
      {
        id: "principles-what-is-investing",
        title: "What is Investing?",
        videoUrl: "https://drive.google.com/uc?export=download&id=1aJmkzp_XmFbVeXAb1wWFhf4urxTCOTAb",
        pdfId: "1aJmkzp_XmFbVeXAb1wWFhf4urxTCOTAb",
      },
    ],
  },
];


export default function ScrollCourseContent({ onSelectVideo }: Props) {
  const totalVideos = sections.reduce((acc, s) => acc + s.videos.length, 0);

  const [completed, setCompleted] = useState<boolean[]>(
    Array(totalVideos).fill(false)
  );
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error("Auth error:", error.message);
      if (data?.user) setUserId(data.user.id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const loadProgress = async () => {
      const { data, error } = await supabase
        .from("user_progress")
        .select("lesson_number, completed")
        .eq("user_id", userId);

      if (error) {
        console.error("Error loading progress:", error.message);
        return;
      }

      if (data) {
        const progress = [...completed];
        data.forEach((item) => {
          progress[item.lesson_number - 1] = item.completed;
        });
        setCompleted(progress);
      }
    };
    loadProgress();
  }, [userId, completed]);

  const toggleLesson = async (globalIndex: number) => {
    if (!userId) return;

    const newCompleted = [...completed];
    newCompleted[globalIndex] = !newCompleted[globalIndex];
    setCompleted(newCompleted);

    const { error } = await supabase.from("user_progress").upsert({
      user_id: userId,
      lesson_number: globalIndex + 1, // store sequentially
      completed: newCompleted[globalIndex],
    });

    if (error) console.error("Error saving progress:", error.message);
  };

  // Helper to calculate global index
  const getGlobalIndex = (sectionIdx: number, videoIdx: number) => {
    return (
      sections
        .slice(0, sectionIdx)
        .reduce((acc, s) => acc + s.videos.length, 0) + videoIdx
    );
  };

  const handleVideoClick = (video: Video) => {
    onSelectVideo(video);
  };

  return (
    <div className="w-full h-full overflow-y-auto border-r p-4">
      <h1 className="font-bold text-lg mb-4 border rounded-lg w-full p-6">
        Course Content
      </h1>

      <ul className="space-y-6 p-2">
        {sections.map((section, sIdx) => (
          <li key={section.number} className="space-y-2">
            <h2 className="font-bold text-2xl">
              {section.number.toString().padStart(2, "0")} {section.title}
            </h2>
            <ul className="pl-6 space-y-1">
              {section.videos.map((video, vIdx) => {
                const globalIndex = getGlobalIndex(sIdx, vIdx);
                return (
                  <li
                    key={video.videoUrl} // ✅ FIX: use driveId instead of video.id
                    className="flex items-center space-x-3"
                  >
                    <input
                      type="checkbox"
                      checked={completed[globalIndex]}
                      onChange={() => toggleLesson(globalIndex)}
                      className="mt-1"
                    />
                    <button
                      onClick={() => handleVideoClick(video)}
                      className={`text-left ${
                        completed[globalIndex]
                          ? "text-gray-500"
                          : "text-blue-600"
                      }`}
                    >
                      Video {video.id}: {video.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
