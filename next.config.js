/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PATH_URL_BACKEND: "http://localhost:3000/api/",
  },
  output: 'standalone',
};

module.exports = nextConfig;
