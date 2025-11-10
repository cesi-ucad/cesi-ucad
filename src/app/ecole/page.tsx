'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';

interface Specialisation {
  nom: string;
  description: string;
  duree: string;
  niveau: string;
}

interface SchoolData {
  nom: string;
  sigle: string;
  description: string;
  departement: string;
  filiere_principale: string;
  localisation: string;
  specialisations: Specialisation[];
  contacts: {
    email: string;
    telephone: string;
    adresse: string;
    site_web: string;
  };
}

export default function Ecole() {
  const [school, setSchool] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/ecole.json');
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données de l\'école');
        }
        
        const schoolData = await response.json();
        setSchool(schoolData);
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
              <div>
                <h3 className="font-semibold">Contacts</h3>
                <p className="mt-1">
                  <a href={`mailto:${school.contacts.email}`} className="text-blue-600 hover:underline">
                    {school.contacts.email}
                  </a>
                </p>
                <p className="mt-1">
                  <a href={`tel:${school.contacts.telephone}`} className="text-blue-600 hover:underline">
                    {school.contacts.telephone}
                  </a>
                </p>
                <p className="mt-1">
                  <a href={school.contacts.site_web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {school.contacts.site_web}
                  </a>
                </p>
                <p className="mt-2">{school.contacts.adresse}</p>
              </div>
              
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

        <Section title="Spécialisations">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {school.specialisations.map((specialisation, index) => (
              <Card
                key={index}
                title={`${specialisation.nom} (${specialisation.niveau})`}
                description={
                  <>
                    <p className="mb-2">{specialisation.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Durée: {specialisation.duree}
                    </p>
                  </>
                }
              />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}