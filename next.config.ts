import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Force maximum quality across all images (default is 75)
    quality: 100,
    // Define breakpoints that match typical screen widths for better image serving
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow modern formats for better compression at similar quality
    formats: ["image/avif", "image/webp"],
    // Disable minimumCacheTTL to avoid stale low-res cached versions
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
