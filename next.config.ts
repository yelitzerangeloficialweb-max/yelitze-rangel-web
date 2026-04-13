import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Define breakpoints for better image serving on large screens
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow modern formats for better quality-to-size ratio
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
