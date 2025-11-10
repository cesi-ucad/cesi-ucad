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
  // Désactive temporairement l'export statique
  // output: 'export',
  // Désactive le rechargement automatique en production
  reactStrictMode: true,
  // Configuration des images
  images: {
    unoptimized: true,
    domains: [],
  },
  // Désactive temporairement la configuration pour Netlify
  // trailingSlash: true,
  // Désactive la génération de source maps en production
  productionBrowserSourceMaps: false,
  // Désactive le header X-Powered-By
  poweredByHeader: false,
  // Désactive le cache de webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;
    }
    return config;
  },
  // Configuration expérimentale
  experimental: {
    // Les Server Actions sont activées par défaut dans Next.js 14
  },
};

module.exports = nextConfig;
