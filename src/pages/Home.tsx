import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface NewsItem {
  article_id: string;
  title: string;
  description: string;
  link: string;
  image_url: string;
  pubDate: string;
  source_name: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [searchParams] = useSearchParams();
  const country = searchParams.get("country") || "in"; // Default to India if no country is specified

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${
            import.meta.env.VITE_NEWS_API_TOKEN
          }&country=${country}&language=en`
        );
        const data = await response.json();
        if (data.status === "success") {
          setNews(data.results);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [country]); // Re-fetch news when country changes

  return (
    <div className="p-4 pt-20 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">
        Top News -{" "}
        {countries.find((c) => c.code === country)?.name || "Country"}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <a
              key={item.article_id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {item.description || "No description available."}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(item.pubDate).toLocaleString()} •{" "}
                  {item.source_name || "Unknown"}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// Define countries array for mapping country code to name
const countries = [
  { name: "India", code: "in" },
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Canada", code: "ca" },
  { name: "Australia", code: "au" },
  { name: "Germany", code: "de" },
  { name: "France", code: "fr" },
  { name: "Japan", code: "jp" },
  { name: "China", code: "cn" },
  { name: "Brazil", code: "br" },
];
