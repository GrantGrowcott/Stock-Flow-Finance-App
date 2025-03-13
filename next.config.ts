import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
    domains: ["nypost.com",
      "image.cnbcfm.com" ]
  },
};

export default nextConfig;
