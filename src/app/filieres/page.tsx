'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';

interface Filiere {
  nom: string;
  description: string;
}

export default function Filieres() {
  const [filieres, setFilieres] = useState<Filiere[]>([]);

  useEffect(() => {
    fetch('/data/filieres.json')
      .then(response => response.json())
      .then(data => setFilieres(data))
      .catch(error => console.error('Erreur lors du chargement des filières:', error));
  }, []);
  return (
    <>
      <Header />
      <main>
        <Section title="Filières">
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