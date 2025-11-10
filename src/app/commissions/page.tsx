'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import Card from '../../components/Card';
import { useState, useEffect } from 'react';

interface Commission {
  nom: string;
  president: string;
}

export default function Commissions() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/commissions.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des commissions');
        }
        return response.json();
      })
      .then(data => setCommissions(data))
      .catch(err => {
        console.error('Erreur:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement des commissions...</div>;
  if (error) return <div>Erreur: {error}</div>;
  return (
    <>
      <Header />
      <main>
        <Section title="Commissions">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {commissions.map((commission, index) => (
              <Card
                key={index}
                title={commission.nom}
                description={`Président: ${commission.president}`}
              />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}