"use client";

import { useState } from "react";

interface Lesson {
  number: string;
  title: string;
  description: string;
}

const lessons: Lesson[] = [
  { number: "01", title: "Welcome", description: "Introduction to the Program" },
  { number: "02", title: "Investing Basics", description: "Understanding investments" },
  { number: "03", title: "Stocks vs Bonds", description: "Difference between asset classes" },
  { number: "04", title: "Portfolio Strategy", description: "Building your portfolio" },
  { number: "05", title: "Advanced Concepts", description: "Analysis and decision-making" },
];

const ScrollCourseContent = () => {
  const [completed, setCompleted] = useState<boolean[]>(Array(lessons.length).fill(false));

  const toggleLesson = (index: number) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  return (
    <div className="w-full h-full overflow-y-auto border-r p-4">
      <h1 className="font-bold text-lg mb-4 border border-[var(--black)] rounded-lg w-full p-6">Course Content</h1>

      <ul>
        {lessons.map((lesson, index) => (
          <li key={index} className="space-y-1 flex gap-4">
            <div className="self-end">
              <input
                type="checkbox"
                checked={completed[index]}
                onChange={() => toggleLesson(index)}
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl">{lesson.number}</h3>
              <h4 className="text-[var(--blue)] font-bold">{lesson.title}</h4>
              <div className="flex items-center space-x-2">
                <span className={completed[index] ? "line-through text-gray-500" : ""}>{lesson.description}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollCourseContent;
