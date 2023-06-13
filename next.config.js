/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["profile.line-scdn.net"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://87ae-202-12-97-143.ngrok-free.app/:path*`,
      },
    ];
  },
};