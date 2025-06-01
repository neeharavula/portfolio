import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nravula-portfolio-assets.s3.amazonaws.com",
        pathname: "/**", // Match all paths under your S3 bucket
      },
    ],
  },
};

export default nextConfig;
