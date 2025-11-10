'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';

interface President {
  nom: string;
  mandat: string;
}

export default function Presidents() {
  const [presidents, setPresidents] = useState<President[]>([]);

  useEffect(() => {
    fetch('/data/presidents.json')
      .then(response => response.json())
      .then(data => setPresidents(data))
      .catch(error => console.error('Erreur lors du chargement des présidents:', error));
  }, []);
  return (
    <>
      <Header />
      <main>
        <Section title="Historique des Présidents">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {presidents.map((president, index) => (
              <Card
                key={index}
                title={president.nom}
                description={`Mandat: ${president.mandat}`}
              />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}