'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface Membre {
  nom: string;
  niveau: string;
  specialite: string;
  photo: string;
  projets: string[];
}

export default function Membres() {
  const [membres, setMembres] = useState<Membre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    niveau: '',
    specialite: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour soumettre le formulaire
    alert('Demande d\'adhésion soumise !');
    setFormData({ nom: '', email: '', niveau: '', specialite: '' });
  };

  useEffect(() => {
    fetch('/data/membres.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des membres');
        }
        return response.json();
      })
      .then(data => setMembres(data))
      .catch(err => {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement des membres...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <Header />
      <Section title="Nos Membres">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {membres.map((membre, index) => (
            <Card
              key={index}
              title={membre.nom}
              description={`${membre.niveau} - ${membre.specialite}`}
              image={membre.photo}
            >
              <div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Projets :</h4>
                <ul className="list-disc list-inside text-xs sm:text-sm">
                  {membre.projets.map((projet, idx) => (
                    <li key={idx}>{projet}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="Adhérer au Club" className="bg-gray-50">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="niveau" className="block text-sm font-medium text-gray-700">Niveau</label>
              <input
                type="text"
                id="niveau"
                name="niveau"
                value={formData.niveau}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="specialite" className="block text-sm font-medium text-gray-700">Spécialité</label>
              <input
                type="text"
                id="specialite"
                name="specialite"
                value={formData.specialite}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button type="submit" variant="primary" size="large">
              Soumettre la demande d&apos;adhésion
            </Button>
          </form>
        </div>
      </Section>
      <Footer />
    </div>
  );
}