"use client";

import { useState, useEffect } from "react";
import { getNews } from "../../../lib/getNews";

type NewsArticle = {
  title: string;
  url: string;
  content: string;
  publishedAt: string;
  source: { name: string };
};

const CACHE_KEY = "cached_news";
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour

const NewsWidget = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { articles, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRATION && Array.isArray(articles)) {
          setNews(articles);
          setLoading(false);
          return;
        }
      }

      try {
        const data = await getNews();
        setNews(Array.isArray(data.articles) ? data.articles : []);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ articles: data.articles, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("News fetch failed:", error);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="p-3 border rounded-lg shadow-lg flex-1 bg-[var(--white)] dark:bg-[var(--darkGrey)]">
      <h2 className="text-xl font-bold mb-2">Latest Business News</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 2rem - 12rem)' }}>
          {news.map((article, index) => (
            <li key={index} className="border-b pb-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--blue)] hover:underline text-xl"
              >
                <p>{article.title}</p>
              </a>
              <p className="text-sm text-gray-500">{article.source?.name}</p>
              <p className="text-m py-1">
                {typeof article.content === "string" ? article.content.slice(0, 200) : ""}...
              </p>
              <p>{article.publishedAt?.split("T")[0]}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsWidget;
