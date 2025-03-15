import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.giphy.com', // Allow all subdomains (media1, media2, media3, etc.)
      },
    ],
  },
};

export default nextConfig;
