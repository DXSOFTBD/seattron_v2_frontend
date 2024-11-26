/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.seattron.com', 'localhost', 'www.facebook.com'],
  },
};

module.exports = nextConfig;
