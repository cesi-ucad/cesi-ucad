'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import { useState, useEffect } from 'react';

interface ClubData {
  nom: string;
  description: string;
  missions: string[];
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
          <Section title="Missions">
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg">
              {club.missions && club.missions.map((mission, index) => (
                <li key={index}>{mission}</li>
              ))}
            </ul>
          </Section>
        </Section>
      </main>
      <Footer />
    </>
  );
}