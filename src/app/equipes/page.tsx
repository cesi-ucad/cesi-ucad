'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';

interface Equipe {
  nom: string;
  domaine: string;
  description: string;
}

export default function Equipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);

  useEffect(() => {
    fetch('/data/equipes.json')
      .then(response => response.json())
      .then(data => setEquipes(data))
      .catch(error => console.error('Erreur lors du chargement des équipes:', error));
  }, []);
  return (
    <div>
      <Header />
      <Section title="Équipes">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {equipes.map((equipe, index) => (
            <Card
              key={index}
              title={equipe.nom}
              description={`${equipe.domaine}: ${equipe.description}`}
            />
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
}