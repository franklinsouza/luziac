/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/lp-hub-diagnostico", destination: "/lp-hub-diagnostico.html" },
      { source: "/politica-de-privacidade", destination: "/politica-de-privacidade.html" },
    ];
  },
}

module.exports = nextConfig
