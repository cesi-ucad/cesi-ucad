'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary-900 to-primary-950 text-white pt-12 pb-6" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CESI</span>
              </div>
              <h2 className="text-xl font-bold">CESI UCAD</h2>
            </div>
            <p className="text-primary-100 text-sm">
              Le Club d'Excellence en Systèmes d'Information de l'UCAD, dédié à l'innovation et à l'excellence dans le domaine des technologies de l'information.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-primary-200 hover:text-white transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-primary-100 hover:text-white transition-colors duration-200 text-sm flex items-center">Accueil</Link></li>
              <li><Link href="/ecole" className="text-primary-100 hover:text-white transition-colors duration-200 text-sm flex items-center">École & Filières</Link></li>
              <li><Link href="/club" className="text-primary-100 hover:text-white transition-colors duration-200 text-sm flex items-center">Le Club</Link></li>
              <li><Link href="/commissions" className="text-primary-100 hover:text-white transition-colors duration-200 text-sm flex items-center">Commissions</Link></li>
              <li><Link href="/realisations" className="text-primary-100 hover:text-white transition-colors duration-200 text-sm flex items-center">Nos Réalisations</Link></li>
              <li><Link href="/membres" className="text-primary-100 hover:text-white transition-colors duration-200 text-sm flex items-center">Espace Membre</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contactez-nous</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-4 w-4 mt-1 text-primary-300 flex-shrink-0" />
                <span className="ml-2 text-primary-100 text-sm">
                  Université Cheikh Anta Diop de Dakar<br />
                  BP 5005, Dakar-Fann, Sénégal
                </span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="h-4 w-4 text-primary-300 flex-shrink-0" />
                <a href="mailto:contact@cesi-ucad.sn" className="ml-2 text-primary-100 hover:text-white transition-colors duration-200 text-sm">
                  contact@cesi-ucad.sn
                </a>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="h-4 w-4 text-primary-300 flex-shrink-0" />
                <a href="tel:+221338601234" className="ml-2 text-primary-100 hover:text-white transition-colors duration-200 text-sm">
                  +221 33 860 12 34
                </a>
              </div>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-primary-100 text-sm mb-3">
              Abonnez-vous à notre newsletter pour recevoir les dernières actualités et événements.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="w-full px-4 py-2 rounded-md bg-primary-800 border border-primary-700 text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Copyright et mentions légales */}
        <div className="border-t border-primary-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-300 text-sm text-center md:text-left">
              &copy; {currentYear} CESI UCAD. Tous droits réservés.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/mentions-legales" className="text-primary-300 hover:text-white text-sm transition-colors duration-200">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-primary-300 hover:text-white text-sm transition-colors duration-200">
                Politique de confidentialité
              </Link>
              <Link href="/contact" className="text-primary-300 hover:text-white text-sm transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>
          <p className="text-center text-primary-400 text-xs mt-4">
            Conçu et développé avec ❤️ par les membres du CESI UCAD
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;