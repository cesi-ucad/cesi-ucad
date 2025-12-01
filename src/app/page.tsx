"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Card from "../components/Card";

const useLazyLoading = () => {
  useEffect(() => {
    if ("loading" in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach((img) => {
        img.setAttribute("loading", "lazy");
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

interface Valeur {
  titre: string;
  description: string;
}

interface ClubData {
  nom: string;
  description: string;
  mission: Array<{
    titre: string;
    description: string;
  }>;
  vision: Array<{
    titre: string;
    description: string;
  }>;
  valeurs: Valeur[];
  objectifs: string[];
}

interface Realisation {
  id: number;
  titre: string;
  date: string;
  image: string;
  domaine: string;
  description: string;
  participants: number;
}

export default function Home() {
  useLazyLoading();
  const [school, setSchool] = useState<SchoolData | null>(null);
  const [club, setClub] = useState<ClubData | null>(null);
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window === "undefined") {
          return;
        }
        const fetchWithErrorHandling = async (url: string) => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              console.error(
                `Erreur lors du chargement de ${url}: ${response.statusText}`
              );
              return null;
            }
            return await response.json();
          } catch (err) {
            console.error(`Error loading ${url}:`, err);
            return null;
          }
        };

        const [clubData, schoolData, realisationsData] = await Promise.all([
          fetchWithErrorHandling("/data/club.json"),
          fetchWithErrorHandling("/data/ecole.json"),
          fetchWithErrorHandling("/data/realisations.json"),
        ]);

        if (!clubData || !schoolData) {
          throw new Error("Impossible de charger les données essentielles");
        }
        setSchool(schoolData);
        setClub(clubData);
        setRealisations(realisationsData || []);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError(
          "Une erreur est survenue lors du chargement des données. Veuillez réessayer."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Chargement des données en cours...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-red-50 rounded-lg">
          <div className="text-red-600 text-4xl mb-3">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Erreur de chargement
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!school || !club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">
            Aucune donnée disponible pour le moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>CESI UCAD - Club des Étudiants de la Section Informatique</title>
        <meta
          name="description"
          content="Découvrez le CESI UCAD, le Club des Étudiants de la Section Informatique de l'Université Cheikh Anta Diop de Dakar. Excellence académique, innovation et communauté dynamique."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="CESI, UCAD, Club Informatique, Étudiants, Sénégal, Dakar, Université Cheikh Anta Diop"
        />
        <meta
          property="og:title"
          content="CESI UCAD - Club des Étudiants de la Section Informatique"
        />
        <meta
          property="og:description"
          content="Découvrez le CESI UCAD, le Club des Étudiants de la Section Informatique de l'UCAD."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cesi-ucad.sn" />
        <meta property="og:image" content="/images/etudiants-cesi.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section
        className="relative h-screen flex items-center justify-center bg-primary-900 overflow-hidden"
        style={{ overflow: "hidden" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/images/etudiants-cesi.jpg"
            alt="Étudiants membres du CESI UCAD"
            className="w-full h-full object-cover"
            style={{
              filter: "brightness(0.7) contrast(1.1)",
              objectPosition: "center 20%",
              marginTop: "-10%",
              height: "110%",
              width: "100%",
            }}
            loading="eager"
          />

          <div
            className="absolute inset-0 bg-primary-900"
            style={{ opacity: 0.3 }}
          ></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Bienvenue au</span>
            <span className="block text-white mt-2">CESI UCAD</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-white sm:text-2xl md:mt-8 md:max-w-3xl">
            Le Club des Étudiants de la Section Informatique de l'UCAD. Une
            communauté dynamique dédiée à l'excellence académique et à
            l'innovation technologique.
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 space-y-4 sm:space-y-0 sm:space-x-6">
            <div>
              <a
                href="/club#rejoindre"
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Nous rejoindre
              </a>
            </div>
            <div>
              <a
                href="#a-propos"
                className="w-full flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
              >
                En savoir plus
              </a>
            </div>
          </div>

          {/* Flèche de défilement */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#a-propos" className="text-white" aria-hidden>
              <span className="w-8 h-8 block" />
            </a>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section id="a-propos" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
              Notre Club
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {club?.nom}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {club?.description}
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {/* Section Mission */}
            <Section title="Notre Mission">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {club?.mission?.map((item, index) => (
                  <Card
                    key={`mission-${index}`}
                    title={item.titre}
                    description={item.description}
                    className="h-full flex flex-col"
                  >
                    <div className="flex-1 flex flex-col">
                      <div className="mt-4 mb-2">{/* Icône supprimée */}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* Section Vision */}
            <Section title="Notre Vision">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {club?.vision?.map((item, index) => (
                  <Card
                    key={`vision-${index}`}
                    title={item.titre}
                    description={item.description}
                    className="h-full flex flex-col"
                  >
                    <div className="flex-1 flex flex-col">
                      <div className="mt-4 mb-2">{/* Icône supprimée */}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* Section Valeurs */}
            <Section title="Nos Valeurs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {club?.valeurs?.map((item, index) => (
                  <Card
                    key={`valeur-${index}`}
                    title={item.titre}
                    description={item.description}
                    className="h-full flex flex-col"
                  >
                    <div className="flex-1 flex flex-col">
                      <div className="mt-4 mb-2">{/* Icône supprimée */}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </section>

      <main className="flex-grow">
        {/* Section photo pleine largeur */}
        <div className="relative w-full h-[70vh] min-h-[600px] overflow-hidden">
          <img
            src="/images/etudiants-cesi-2.jpg"
            alt="Étudiants du CESI UCAD"
            className="w-full h-full object-cover"
            style={{
              filter: "brightness(0.7) contrast(1.1)",
              objectPosition: "center 20%",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Rejoignez notre communauté
              </h2>
              <p className="mt-4 text-xl text-white max-w-2xl">
                Découvrez un environnement dynamique dédié à l'excellence
                académique et à l'innovation
              </p>
            </div>
          </div>
        </div>

        {/* Section Équipes */}
        <Section title="Nos Équipes" className="bg-gray-50 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Équipe InspiCode */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-4 rounded-full bg-white p-2 shadow-md flex items-center justify-center">
                    <img
                      src="/images/logo-InspiCode.jpg"
                      alt="Logo InspiCode"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    InspiCode
                  </h3>
                  <p className="text-primary-600 font-medium mb-4">
                    Développement & Innovation
                  </p>
                  <p className="text-gray-600">
                    L'équipe dédiée au développement web, mobile et à
                    l'innovation technologique. Nous transformons les idées en
                    solutions numériques performantes.
                  </p>
                </div>
              </div>
            </div>

            {/* Équipe skAi */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-4 rounded-full bg-white p-2 shadow-md flex items-center justify-center">
                    <img
                      src="/images/logo-skAi.jpg"
                      alt="Logo skAi"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">skAi</h3>
                  <p className="text-primary-600 font-medium mb-4">
                    Intelligence Artificielle
                  </p>
                  <p className="text-gray-600">
                    Spécialistes en intelligence artificielle et science des
                    données. Nous explorons les possibilités de l'IA pour
                    résoudre des problèmes complexes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
        {/* Section Réalisations */}
        <Section title="Nos Réalisations" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  Chargement des réalisations...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-600">
                <p>Erreur lors du chargement des réalisations : {error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {realisations.map((realisation) => (
                  <div
                    key={realisation.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                  >
                    {/* Image en pleine largeur avec hauteur ajustée */}
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

                    {/* Contenu de la carte - version plus compacte */}
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
                          {new Date(realisation.date).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
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
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
