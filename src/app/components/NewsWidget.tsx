import { useState, useEffect, useRef } from "react";
import { NewsArticle, CACHE_KEY, CACHE_EXPIRATION } from "@/constants";
import { getNews } from "../api/api";


const NewsWidget = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const prevNews = useRef<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { articles, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRATION) {
          setNews(articles);
          prevNews.current = articles; 
          setLoading(false);
          return;
        }
      }

      // Fetch new data if cache is outdated
      try {
        const data = await getNews();
        if (JSON.stringify(data.articles) !== JSON.stringify(prevNews.current)) {
          setNews(data.articles || []);
          prevNews.current = data.articles || [];
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ articles: data.articles, timestamp: Date.now() })
          );
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className=" p-3 border rounded-lg shadow-lg flex-1 bg-[var(--white)] dark:bg-[var(--darkGrey)] ">
      <h2 className="text-xl font-bold mb-2">Latest Business News</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 2rem - 12rem)' }}>

          {news.map((article: NewsArticle, index: number) => (
            <li key={index} className="border-b pb-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--blue)] hover:underline text-xl"
              >
                <p>{article.title}</p>
              </a>
              {article.source.name}
              <p className="text-m py-1">{article.content?.slice(0, 200)}...</p>
              <p>{article.publishedAt?.split("T")[0]}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsWidget;
