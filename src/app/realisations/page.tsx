'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';

interface Realisation {
  titre: string;
  description: string;
  date: string;
  responsable: string;
}

export default function Realisations() {
  const [realisations, setRealisations] = useState<Realisation[]>([]);

  useEffect(() => {
    fetch('/data/realisations.json')
      .then(response => response.json())
      .then(data => setRealisations(data))
      .catch(error => console.error('Erreur lors du chargement des réalisations:', error));
  }, []);
  return (
    <div>
      <Header />
      <Section title="Réalisations">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {realisations.map((realisation, index) => (
            <Card
              key={index}
              title={realisation.titre}
              description={`${realisation.date} - ${realisation.responsable}: ${realisation.description}`}
            />
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
}