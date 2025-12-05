"use client";

import React, { useState, useMemo } from "react";
import ImageWithFallback from "./ImageWithFallback";

interface Membre {
  id?: string;
  nom: string;
  "annee d'admission": number;
  genre: string;
  photo: string;
  github: string;
}

interface Article {
  title: string;
  author: string;
  date: string;
  content: string;
  slug: string;
  authorData?: Membre;
}

interface Props {
  articles: Article[];
}

export default function ArticlesListClient({ articles }: Props) {
  const BATCH = 60; // render in batches to save memory
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    if (!searchQuery) return articles;
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        (article.authorData &&
          article.authorData.nom.toLowerCase().includes(query))
    );
  }, [articles, searchQuery]);

  const visible = filteredArticles.slice(0, visibleCount);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un article..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {visible.map((article) => (
          <button
            key={article.slug}
            onClick={() => setSelectedArticle(article)}
            className="flex flex-col items-center bg-white rounded-md p-4 shadow-sm hover:shadow-lg transition-shadow duration-150 border-2 hover:border-blue-500"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-2">
              {article.authorData && (
                <ImageWithFallback
                  src={article.authorData.photo}
                  alt={article.authorData.nom}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  fallbackSrc="/images/membres/fallback.svg"
                />
              )}
            </div>
            <div className="text-center">
              <div className="truncate font-medium text-sm mb-1">
                {article.title}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {article.authorData ? article.authorData.nom : article.author}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(article.date).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal for selected article */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedArticle(null)}
          />

          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 md:mx-0 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end p-3">
              <button
                onClick={() => setSelectedArticle(null)}
                aria-label="Fermer"
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                {selectedArticle.authorData && (
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={selectedArticle.authorData.photo}
                        alt={selectedArticle.authorData.nom}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        fallbackSrc="/images/membres/fallback.svg"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedArticle.authorData.nom}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(selectedArticle.date).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedArticle.title}
              </h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
            </div>
          </div>
        </div>
      )}

      {visibleCount < filteredArticles.length && (
        <div className="mt-4 text-center">
          <button
            onClick={() =>
              setVisibleCount((v) =>
                Math.min(filteredArticles.length, v + BATCH)
              )
            }
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Charger plus ({filteredArticles.length - visibleCount} restants)
          </button>
        </div>
      )}
    </div>
  );
}
