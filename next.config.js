/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/lp-hub-diagnostico", destination: "/lp-hub-diagnostico.html" },
    ];
  },
}

module.exports = nextConfig
