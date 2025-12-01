"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section from "../../components/Section";
import { useState, useEffect } from "react";

interface Realisation {
  id: number;
  titre: string;
  description: string;
  date: string;
  image: string;
  domaine: string;
  participants: number;
}

export default function Realisations() {
  const [realisations, setRealisations] = useState<Realisation[]>([]);

  useEffect(() => {
    fetch("/data/realisations.json")
      .then((response) => response.json())
      .then((data) => setRealisations(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des réalisations:", error)
      );
  }, []);
  return (
    <div>
      <Header />
      <Section title="Nos Réalisations" className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {realisations.map((realisation) => (
            <div
              key={realisation.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="w-full h-64 overflow-hidden bg-gray-100">
                <img
                  src={`/images/${realisation.image}`}
                  alt={realisation.titre}
                  className="w-full h-full object-contain object-center p-2"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/images/etudiants-cesi.jpg";
                  }}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2">
                  <h3
                    className="text-lg font-semibold text-gray-900 line-clamp-2"
                    title={realisation.titre}
                  >
                    {realisation.titre}
                  </h3>
                  <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {realisation.domaine}
                  </span>
                </div>

                <div className="mt-2 text-xs text-gray-500 flex items-center">
                  <span>
                    {new Date(realisation.date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="mx-1.5">•</span>
                  <span>{realisation.participants} participants</span>
                </div>

                <p
                  className="mt-2 text-sm text-gray-600 line-clamp-3"
                  title={realisation.description}
                >
                  {realisation.description}
                </p>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    onClick={() => {
                      console.log("Voir plus pour :", realisation.titre);
                    }}
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
}
