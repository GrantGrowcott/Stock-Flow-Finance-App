import { useState, useEffect } from "react";

export async function getNews() {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?category=business&apiKey=ee4c5c77acfc417f97d6ec65e8c8eb5c"
  );
  return res.json();
}

interface NewsArticle {
  title: string;
  url: string;
  author?: string;
  source: {
    name: string;
  };
  description: string;
  publishedAt?: string;
  content: string;
}

const NewsWidget = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const data = await getNews();
      setNews(data.articles || []);
      setLoading(false);
    }

    fetchNews();
  }, []);

  return (
    <div className=" p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Latest Business News</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="p-5 space-y-2 overflow-y-auto max-h-[80vh]">
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
              <p className="text-m py-1 text-gray-700">{article.content?.slice(0, 200)}...</p>
              <p>{article.publishedAt?.split("T")[0]}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsWidget;
