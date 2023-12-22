/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PATH_URL_BACKEND: `${process.env.NEXT_PUBLIC_SITE_URL}:3000/api/`,
  },
  output: "standalone",
};

module.exports = nextConfig;
