'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';

interface SchoolData {
  nom: string;
  description: string;
  fondation: string;
  effectif: number;
  campus: string[];
  image: string;
}

interface Filiere {
  id: number;
  nom: string;
  description: string;
}

export default function Ecole() {
  const [school, setSchool] = useState<SchoolData | null>(null);
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [schoolRes, filieresRes] = await Promise.all([
          fetch('/data/school.json'),
          fetch('/data/filieres.json')
        ]);
        
        if (!schoolRes.ok || !filieresRes.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        
        const [schoolData, filieresData] = await Promise.all([
          schoolRes.json(),
          filieresRes.json()
        ]);
        
        setSchool(schoolData);
        setFilieres(filieresData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        console.error('Erreur lors du chargement des données:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!school) return null;
  return (
    <>
      <Header />
      <main>
        <Section title="Informations sur l'École">
          <Card
            title={school.nom}
            description={`${school.description} Fondée en ${school.fondation}. Effectif: ${school.effectif} étudiants.`}
          />
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Campus :</h3>
            <ul className="list-disc pl-5">
              {school.campus.map((campus, index) => (
                <li key={index} className="mb-1">{campus}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section title="Filières proposées">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filieres.map((filiere, index) => (
              <Card
                key={index}
                title={filiere.nom}
                description={filiere.description}
              />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}