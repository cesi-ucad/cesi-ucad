'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Section from '../components/Section';
import Card from '../components/Card';
// Les données sont maintenant chargées dynamiquement via des appels fetch

// Fonction utilitaire pour le chargement paresseux des images
const useLazyLoading = () => {
  useEffect(() => {
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.setAttribute('loading', 'lazy');
      });
    }
  }, []);
};

interface SchoolData {
  nom: string;
  sigle: string;
  description: string;
  departement: string;
  filiere_principale: string;
  localisation: string;
}

interface ClubData {
  nom: string;
  description: string;
  missions: string[];
}

interface Equipe {
  nom: string;
  domaine: string;
  description: string;
}

export default function Home() {
  useLazyLoading(); // Activer le chargement paresseux
  const [school, setSchool] = useState<SchoolData | null>(null);
  const [club, setClub] = useState<ClubData | null>(null);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chargement en parallèle des données
        const [schoolRes, clubRes, equipesRes] = await Promise.all([
          fetch('/data/school.json'),
          fetch('/data/club.json'),
          fetch('/data/equipes.json')
        ]);

        if (!schoolRes.ok || !clubRes.ok || !equipesRes.ok) {
          throw new Error('Erreur lors du chargement des données');
        }

        const [schoolData, clubData, equipesData] = await Promise.all([
          schoolRes.json(),
          clubRes.json(),
          equipesRes.json()
        ]);

        setSchool(schoolData);
        setClub(clubData);
        setEquipes(equipesData);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!school || !club) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>CESI UCAD - Club des Étudiants de la Section Informatique</title>
        <meta name="description" content="Découvrez le CESI UCAD, le Club des Étudiants de la Section Informatique de l'Université Cheikh Anta Diop de Dakar. Excellence académique, innovation et communauté dynamique." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="CESI, UCAD, Club Informatique, Étudiants, Sénégal, Dakar, Université Cheikh Anta Diop" />
        <meta property="og:title" content="CESI UCAD - Club des Étudiants de la Section Informatique" />
        <meta property="og:description" content="Découvrez le CESI UCAD, le Club des Étudiants de la Section Informatique de l'UCAD." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cesi-ucad.sn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Bienvenue sur le site du {club?.nom} - {school?.sigle}</h1>
            <p className="text-xl max-w-2xl mx-auto">
              {school?.description}
            </p>
          </div>
        </section>

        {/* Section Présentation de l'École */}
        <Section title="À propos de l'École">
          <div className="flex justify-center">
            <Card
              title={`${school?.sigle} - ${school?.nom}`}
              description={school?.description}
              footer={`${school?.departement} - ${school?.localisation}`}
            >
              <p><strong>Filière principale :</strong> {school?.filiere_principale}</p>
              <p><strong>Localisation :</strong> {school?.localisation}</p>
            </Card>
          </div>
        </Section>

        {/* Section Présentation du Club */}
        <Section title="Le Club CESI UCAD" className="bg-gray-100">
          <div className="flex justify-center">
            <Card
              title={club?.nom || 'Club CESI UCAD'}
              description={club?.description || ''}
            >
              <h4 className="font-semibold mb-2">Missions :</h4>
              <ul className="list-disc list-inside">
                {club?.missions?.map((mission, index) => (
                  <li key={index}>{mission}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        {/* Section Présentation des Équipes */}
        <Section title="Nos Équipes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equipes.map((equipe, index) => (
              <Card
                key={index}
                title={equipe.nom}
                description={equipe.description}
              >
                <p><strong>Domaine :</strong> {equipe.domaine}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Section Liens vers les autres pages */}
        <Section title="Explorez notre site" className="bg-gray-100">
          <div className="text-center">
            <p className="mb-6">Découvrez plus sur nos activités, projets et membres :</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <a href="/ecole" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">École</a>
              <a href="/filieres" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">Filières</a>
              <a href="/club" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">Club</a>
              <a href="/commissions" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">Commissions</a>
              <a href="/presidents" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">Présidents</a>
              <a href="/equipes" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">Équipes</a>
              <a href="/realisations" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">Réalisations</a>
              <a href="/membres" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">Membres</a>
              <a href="/projets" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">Projets</a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
