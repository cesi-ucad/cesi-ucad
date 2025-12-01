"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section from "../../components/Section";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ErrorBoundary from "../../components/ErrorBoundary";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Projet {
  titre: string;
  auteur: string;
  description: string;
  technos: string[];
  github: string;
}

const ITEMS_PER_PAGE = 6;

export default function Projets() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const loadProjets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/data/projets.json");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des projets");
      }
      const data = await response.json();
      setProjets(data);
    } catch (err) {
      console.error("Erreur:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjets();
  }, [loadProjets]);

  const filteredProjets = projets.filter(
    (projet) =>
      projet.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projet.technos.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const totalPages = Math.ceil(filteredProjets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjets = filteredProjets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement des projets..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Erreur lors du chargement
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button onClick={loadProjets} variant="primary">
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ErrorBoundary>
          <Section title="Nos Projets">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Rechercher un projet..."
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {filteredProjets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun projet trouvé.</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedProjets.map((projet, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      className="w-full h-full"
                    >
                      <Card
                        title={projet.titre}
                        description={projet.description}
                      >
                        <div className="mb-4">
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">
                            <strong>Auteur :</strong> {projet.auteur}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-4">
                            <strong>Technologies :</strong>{" "}
                            {projet.technos.join(", ")}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {index + 1 + startIndex} sur{" "}
                              {filteredProjets.length} projets
                            </span>
                            <Button
                              onClick={() =>
                                window.open(projet.github, "_blank")
                              }
                              variant="primary"
                              size="small"
                            >
                              Voir sur GitHub
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Précédent
                      </button>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-10 h-10 rounded-full ${
                                currentPage === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Suivant
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            )}
          </Section>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
