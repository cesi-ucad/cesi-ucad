"use client";

import Link from "next/link";
import { useState } from "react";
import type { FC } from "react";
import {
  FaHome,
  FaGraduationCap,
  FaUsers,
  FaCog,
  FaNewspaper,
  FaTrophy,
  FaUserFriends,
  FaEnvelope,
} from "react-icons/fa";
interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  "aria-hidden"?: "true" | "false" | boolean;
  children?: React.ReactNode;
}

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  interface NavLink {
    href: string;
    label: string;
    icon: FC<SVGProps>;
  }
  const navLinks: NavLink[] = [
    { href: "/", label: "Accueil", icon: FaHome },
    { href: "/ecole", label: "École & Filières", icon: FaGraduationCap },
    { href: "/club", label: "Le Club", icon: FaUsers },
    { href: "/commissions", label: "Commissions", icon: FaCog },
    { href: "/realisations", label: "Nos Réalisations", icon: FaTrophy },
    { href: "/membres", label: "Membres", icon: FaUserFriends },
    { href: "/contact", label: "Contact", icon: FaEnvelope },
    { href: "/articles", label: "Articles", icon: FaNewspaper },
  ];

  return (
    <header className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 shadow-xl sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="/images/logo-cesi.jpg"
                  alt="Logo CESI UCAD"
                  className="h-10 w-auto"
                />
              </div>
              <div className="hidden md:block">
                <span className="text-white text-xl font-bold">CESI UCAD</span>
                <p className="text-primary-200 text-xs">
                  Club d'Excellence en Systèmes d'Information
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden lg:block">
            <ul className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center text-white hover:bg-primary-700 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-white transition-all duration-200"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span className="sr-only">
                {isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              </span>
              <svg
                className={`h-6 w-6 transform transition-transform duration-200 ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
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

      <div
        id="mobile-menu"
        className={`lg:hidden bg-primary-800 transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center text-white hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenu}
            >
              <link.icon className="mr-2 h-5 w-5" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
