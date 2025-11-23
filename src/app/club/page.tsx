'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import { useState, useEffect } from 'react';

interface ClubData {
  nom: string;
  description: string;
  mission: { titre: string; description: string }[];
  vision: { titre: string; description: string }[];
  objectifs: string[];
  valeurs: { titre: string; description: string }[];
}

export default function Club() {
  const [club, setClub] = useState<ClubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/club.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données du club');
        }
        return response.json();
      })
      .then(data => setClub(data))
      .catch(err => {
        console.error('Erreur:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
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
              {club.mission && club.mission.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{item.titre}</h4>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Notre Vision">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {club.vision && club.vision.map((item, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{item.titre}</h4>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Nos Objectifs">
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
              {club.objectifs && club.objectifs.map((objectif, index) => (
                <li key={index}>{objectif}</li>
              ))}
            </ul>
          </Section>

          <Section title="Nos Valeurs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {club.valeurs && club.valeurs.map((valeur, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{valeur.titre}</h4>
                  <p className="text-sm">{valeur.description}</p>
                </div>
              ))}
            </div>
          </Section>
        </Section>
      </main>
      <Footer />
    </>
  );
}