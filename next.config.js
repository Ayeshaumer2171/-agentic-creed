/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://gateway-aac.apiswagger.co.uk/:path*", 
      },
    ];
  },
};

module.exports = nextConfig;
