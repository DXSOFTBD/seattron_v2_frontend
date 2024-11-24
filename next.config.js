/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.seattron.com', 'localhost:3000', 'www.facebook.com'],
  },
};

module.exports = nextConfig;
