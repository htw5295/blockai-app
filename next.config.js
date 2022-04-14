/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n,
  async redirects() {
    return [
      // {
      //   source: '/:userId/:projectId',
      //   destination: '/:userId/:projectId/about',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
