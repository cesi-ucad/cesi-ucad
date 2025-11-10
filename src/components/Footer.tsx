'use client';

import Link from 'next/link';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-sm">Email: contact@cesi-ucad.sn</p>
            <p className="text-sm">Téléphone: +221 33 123 45 67</p>
            <p className="text-sm">Adresse: Dakar, Sénégal</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Liens utiles</h3>
            <ul className="text-sm space-y-1">
              <li><Link href="/ecole" className="hover:underline transition-colors duration-200">École</Link></li>
              <li><Link href="/filieres" className="hover:underline transition-colors duration-200">Filières</Link></li>
              <li><Link href="/club" className="hover:underline transition-colors duration-200">Club</Link></li>
              <li><Link href="/projets" className="hover:underline transition-colors duration-200">Projets</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Suivez-nous</h3>
            <p className="text-sm">Restez connecté avec nous sur les réseaux sociaux.</p>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-4 text-center">
          <p className="text-sm">&copy; {currentYear} CESI UCAD. Tous droits réservés.</p>
          <p className="text-sm">Site réalisé par les étudiants de CESI UCAD.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;