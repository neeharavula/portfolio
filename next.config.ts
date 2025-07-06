import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Config options */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nravula-portfolio-assets.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
