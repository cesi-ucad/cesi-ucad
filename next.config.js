/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [],
  },
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  experimental: {},
};

module.exports = nextConfig;
