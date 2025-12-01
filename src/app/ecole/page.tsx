"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section from "../../components/Section";
import { useState, useEffect } from "react";

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
        const response = await fetch("/data/ecole.json");

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données de l'école");
        }

        const schoolData = await response.json();
        setSchool(schoolData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        console.error("Erreur lors du chargement des données:", err);
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
        <Section title={`${school.nom} (${school.sigle})`}>
          <p className="text-center mb-6">{school.description}</p>

          <Section title="Informations Générales">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {school.departement && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Département</h4>
                  <p className="text-sm">{school.departement}</p>
                </div>
              )}
              {school.filiere_principale && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Filière Principale</h4>
                  <p className="text-sm">{school.filiere_principale}</p>
                </div>
              )}
              {school.localisation && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Localisation</h4>
                  <p className="text-sm">{school.localisation}</p>
                </div>
              )}
            </div>
          </Section>

          <Section title="Contacts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Email</h4>
                <a
                  href={`mailto:${school.contacts.email}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {school.contacts.email}
                </a>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Téléphone</h4>
                <a
                  href={`tel:${school.contacts.telephone}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {school.contacts.telephone}
                </a>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Site Web</h4>
                <a
                  href={school.contacts.site_web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {school.contacts.site_web}
                </a>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Adresse</h4>
                <p className="text-sm">{school.contacts.adresse}</p>
              </div>
            </div>
          </Section>

          <Section title="Spécialisations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {school.specialisations.map((specialisation, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{specialisation.nom}</h4>
                  <p className="text-sm mb-2">{specialisation.description}</p>
                  <p className="text-sm text-gray-600">
                    Niveau: {specialisation.niveau}
                  </p>
                  <p className="text-sm text-gray-600">
                    Durée: {specialisation.duree}
                  </p>
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
