'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';

interface SchoolData {
  nom: string;
  description: string;
  fondation?: string;
  effectif?: number;
  campus?: string[];
  image?: string;
  localisation?: string;
  sigle?: string;
  departement?: string;
  filiere_principale?: string;
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
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{school.nom} {school.sigle && `(${school.sigle})`}</h2>
            <p className="text-gray-700 dark:text-gray-300">{school.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {school.fondation && (
                <div>
                  <h3 className="font-semibold">Année de fondation</h3>
                  <p>{school.fondation}</p>
                </div>
              )}
              
              {school.effectif && (
                <div>
                  <h3 className="font-semibold">Effectif</h3>
                  <p>{school.effectif} étudiants</p>
                </div>
              )}
              
              {school.departement && (
                <div>
                  <h3 className="font-semibold">Département</h3>
                  <p>{school.departement}</p>
                </div>
              )}
              
              {school.filiere_principale && (
                <div>
                  <h3 className="font-semibold">Filière principale</h3>
                  <p>{school.filiere_principale}</p>
                </div>
              )}
              
              {school.localisation && (
                <div className="md:col-span-2">
                  <h3 className="font-semibold">Localisation</h3>
                  <p>{school.localisation}</p>
                </div>
              )}
            </div>
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