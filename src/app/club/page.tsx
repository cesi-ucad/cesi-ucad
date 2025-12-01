"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section from "../../components/Section";
import { useState, useEffect } from "react";

interface ClubData {
  nom: string;
  description: string;
  mission: { titre: string; description: string }[];
  vision: { titre: string; description: string }[];
  objectifs: string[];
  valeurs: { titre: string; description: string }[];
}

interface President {
  prenom: string;
  nom: string;
  email?: string;
  telephone?: string;
  citation?: string;
}

export default function Club() {
  const [club, setClub] = useState<ClubData | null>(null);
  const [president, setPresident] = useState<President | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/club.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données du club");
        }
        return response.json();
      })
      .then((data) => setClub(data))
      .catch((err) => {
        console.error("Erreur:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));

    fetch("/data/president.json")
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((p) => {
        if (p) {
          setPresident({
            prenom: p.prenom,
            nom: p.nom,
            email: p.email,
            telephone: p.telephone,
            citation:
              p.citation ||
              "Un bon leader inspire, écoute et fait grandir les autres.",
          });
        }
      })
      .catch((e) => console.error("Erreur président:", e));
  }, []);

  if (loading) return <div>Chargement des informations du club...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!club) return null;
  return (
    <>
      <Header />
      <main>
        <Section title={club.nom}>
          <p className="text-center mb-6">{club.description}</p>

          <Section title="Notre Mission">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {club.mission &&
                club.mission.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">{item.titre}</h4>
                    <p className="text-sm">{item.description}</p>
                  </div>
                ))}
            </div>
          </Section>

          <Section title="Notre Vision">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {club.vision &&
                club.vision.map((item, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">{item.titre}</h4>
                    <p className="text-sm">{item.description}</p>
                  </div>
                ))}
            </div>
          </Section>

          <Section title="Nos Objectifs">
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
              {club.objectifs &&
                club.objectifs.map((objectif, index) => (
                  <li key={index}>{objectif}</li>
                ))}
            </ul>
          </Section>

          <Section title="Nos Valeurs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {club.valeurs &&
                club.valeurs.map((valeur, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">{valeur.titre}</h4>
                    <p className="text-sm">{valeur.description}</p>
                  </div>
                ))}
            </div>
          </Section>

          {president && (
            <Section title="Président">
              <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-2">
                  {president.prenom} {president.nom}
                </h3>
                {president.email && (
                  <p className="text-sm text-gray-600 mb-1">
                    <a
                      href={`mailto:${president.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {president.email}
                    </a>
                  </p>
                )}
                {president.telephone && (
                  <p className="text-sm text-gray-600 mb-3">
                    {president.telephone}
                  </p>
                )}
                <blockquote className="mt-4 italic text-gray-700">
                  “{president.citation}”
                </blockquote>
              </div>
            </Section>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
