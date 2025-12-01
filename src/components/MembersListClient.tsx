"use client";

import React, { useState, useMemo } from "react";
import ImageWithFallback from "./ImageWithFallback";
import { FaGithub, FaCalendar } from "react-icons/fa";

interface Membre {
  id?: string;
  nom: string;
  "annee d'admission": number;
  genre: string;
  photo: string;
  github: string;
}

interface Props {
  initialMembers: Membre[];
}

export default function MembersListClient({ initialMembers }: Props) {
  const BATCH = 60; // render in batches to save memory
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const [selected, setSelected] = useState<Membre | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    if (!searchQuery) return initialMembers || [];
    return (initialMembers || []).filter((m) =>
      m.nom.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialMembers, searchQuery]);

  const visible = filteredMembers.slice(0, visibleCount);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un membre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {visible.map((m) => (
          <button
            key={m.id ?? m.nom}
            onClick={() => setSelected(m)}
            className={`flex items-center space-x-3 bg-white rounded-md p-2 shadow-sm hover:shadow-lg transition-shadow duration-150 text-left border-2 hover:${
              m.genre === "feminin" ? "border-pink-500" : "border-blue-500"
            }`}
            title={m.nom}
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={m.photo}
                alt={m.nom}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                fallbackSrc="/images/membres/fallback.svg"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="truncate font-medium text-sm">{m.nom}</div>
                {m.github && (
                  <a
                    href={m.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800 ml-2"
                    aria-label={`GitHub de ${m.nom}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
              <div className="text-xs text-gray-500 truncate flex items-center">
                <FaCalendar className="mr-1" /> {m["annee d'admission"]}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal for selected member */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelected(null)}
          />

          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 md:mx-0">
            <div className="flex justify-end p-3">
              <button
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex items-center justify-center">
                <ImageWithFallback
                  src={selected.photo}
                  alt={`${selected.nom} photo`}
                  width={500}
                  height={500}
                  fallbackSrc="/images/membres/fallback.svg"
                  className="object-cover rounded"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">{selected.nom}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  a rejoint la SI en {selected["annee d'admission"]}
                </p>
                {selected.github && (
                  <p className="mb-4">
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:underline"
                    >
                      <FaGithub className="mr-2" /> Voir le profil GitHub
                    </a>
                  </p>
                )}
                {/* Add any other details here if available in JSON */}
              </div>
            </div>
          </div>
        </div>
      )}

      {visibleCount < filteredMembers.length && (
        <div className="mt-4 text-center">
          <button
            onClick={() =>
              setVisibleCount((v) =>
                Math.min(filteredMembers.length, v + BATCH)
              )
            }
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Charger plus ({filteredMembers.length - visibleCount} restants)
          </button>
        </div>
      )}
    </div>
  );
}
