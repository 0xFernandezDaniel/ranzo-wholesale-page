import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**.cloudfront.net" }, { protocol: "https", hostname: "ranzohardware.com" }] },
};

export default nextConfig;
