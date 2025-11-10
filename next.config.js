/** @type {import('next').NextConfig} */

const nextConfig = {
  // Désactive la vérification TypeScript pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Désactive la vérification ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuration pour l'exportation statique
  output: 'export',
  // Désactive le rechargement automatique en production
  reactStrictMode: false,
  // Configuration des images
  images: {
    unoptimized: true, // Désactive l'optimisation d'image pour l'export statique
    domains: [],
  },
  // Configuration pour Netlify
  trailingSlash: true,
  // Désactive la génération de source maps en production
  productionBrowserSourceMaps: false,
  // Désactive le header X-Powered-By
  poweredByHeader: false,
};

module.exports = nextConfig;
