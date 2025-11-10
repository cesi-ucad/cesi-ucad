'use client';

import Link from 'next/link';
import { useState, ReactElement } from 'react';

// Définition des types pour les propriétés des éléments SVG
interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  'aria-hidden'?: 'true' | 'false' | boolean;
  children?: React.ReactNode;
}

const Header = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour basculer le menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Données des liens de navigation
  const navLinks = [
    { href: '/ecole', label: 'École' },
    { href: '/filieres', label: 'Filières' },
    { href: '/club', label: 'Club' },
    { href: '/commissions', label: 'Commissions' },
    { href: '/presidents', label: 'Présidents' },
    { href: '/equipes', label: 'Équipes' },
    { href: '/realisations', label: 'Réalisations' },
    { href: '/membres', label: 'Membres' },
    { href: '/projets', label: 'Projets' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-extrabold text-white hover:text-blue-100 transition-colors duration-200 flex items-center"
            >
              <span className="bg-white text-blue-600 px-3 py-1 rounded-lg mr-2">CESI</span>
              <span>UCAD</span>
            </Link>
          </div>
          
          {/* Menu desktop */}
          <div className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white transition-colors duration-200"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <span className="sr-only">
                {isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              </span>
              <svg 
                className={`h-6 w-6 transform transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden={true}
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Menu mobile */}
      <div 
        id="mobile-menu" 
        className={`md:hidden bg-blue-600 transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 py-2' : 'max-h-0 py-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;