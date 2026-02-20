import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // If deploying to GitHub Pages at https://<user>.github.io/<repo>/,
  // uncomment and set basePath to your repo name:
  // basePath: "/your-repo-name",
  images: { unoptimized: true },
};

export default nextConfig;
