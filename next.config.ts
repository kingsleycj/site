import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Screenshots are immutable once captured: keep optimised copies cached at the edge for a month.
  images: { qualities: [75, 90], minimumCacheTTL: 2678400 },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
