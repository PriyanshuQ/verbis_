import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Set the desired limit (e.g., '5mb', '10mb')
    },
  },
};

export default nextConfig;
