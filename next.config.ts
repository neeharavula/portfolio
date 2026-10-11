import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Config options */
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f6ciazohrats9a1e.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
