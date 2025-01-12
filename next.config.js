/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.irroba.com.br",
      },
    ],
  },
};

module.exports = nextConfig;
