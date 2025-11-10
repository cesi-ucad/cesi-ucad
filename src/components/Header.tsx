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
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            CESI UCAD
          </Link>
        </div>
        
        {/* Menu hamburger pour mobile */}
        <button
          type="button"
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">
            {isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          </span>
          <svg 
            className="w-6 h-6" 
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
        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href}
                className="hover:underline hover:opacity-80 transition-opacity px-2 py-1 rounded"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Menu mobile */}
        <div 
          id="mobile-menu" 
          className={`md:hidden absolute top-full left-0 right-0 bg-blue-600 flex flex-col space-y-2 p-4 transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'opacity-100 visible max-h-screen py-4' 
              : 'opacity-0 invisible max-h-0 py-0 overflow-hidden'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={`mobile-${link.href}`}>
                <Link 
                  href={link.href}
                  className="block hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;