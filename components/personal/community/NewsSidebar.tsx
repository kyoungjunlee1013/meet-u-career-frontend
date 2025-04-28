"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { apiClient } from "@/api/apiClient";

interface NewsItem {
  title: string;
  url: string;
  category: string;
  date: string;
}

interface NewsSidebarProps {
  selectedTags: string[];
}

export const NewsSidebar = ({ selectedTags }: NewsSidebarProps) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (selectedTags.length === 0) {
          setNewsItems([]);
          return;
        }

        const selectedTag = selectedTags[0].replace("#", "");
        console.log("요청할 뉴스 해시태그:", selectedTag);

        const today = new Date();
        const toDate = today.toISOString().split("T")[0];
        const fromDate = new Date(today.setMonth(today.getMonth() - 1))
          .toISOString()
          .split("T")[0];

        const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

        const res = await apiClient.get(`https://newsapi.org/v2/everything`, {
          params: {
            q: selectedTag,
            from: fromDate,
            to: toDate,
            pageSize: 5,
            sortBy: "publishedAt",
            language: "ko",
            apiKey: apiKey,
          },
        });

        const articles = (await res.data.articles) || [];

        const newsList = articles.map((article: any) => ({
          title: article.title,
          url: article.url,
          category: article.source?.name || "알 수 없음",
          date: article.publishedAt?.split("T")[0] || "",
        }));

        await setNewsItems(newsList);
      } catch (error) {
        console.error("뉴스를 불러오는 데 실패했습니다.", error);
        setNewsItems([]);
      }
    };

    fetchNews();
  }, [selectedTags]);

  useEffect(() => {
    console.log("렌더링된 newsItems:", newsItems);
  }, [newsItems]);

  return (
    <div>
      <div className="bg-white border rounded-md p-4 mb-6">
        <h2 className="text-lg font-medium mb-4">최신 뉴스</h2>
        <ul className="space-y-4">
          {newsItems.length > 0 ? (
            newsItems.map((item, idx) => (
              <li key={idx}>
                <Link href={item.url} className="group block" target="_blank">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-medium group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{item.category}</span>
                    <span className="mx-1">•</span>
                    <span>{item.date}</span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">
              선택된 해시태그에 해당하는 뉴스가 없습니다.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
