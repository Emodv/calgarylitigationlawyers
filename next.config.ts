import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [{ source: "/advertise", destination: "/pricing", permanent: true }];
  },
};

export default nextConfig;
