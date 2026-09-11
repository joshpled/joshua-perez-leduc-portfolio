import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];

if (isGitHubPagesBuild && !repositoryName) {
  throw new Error("GITHUB_REPOSITORY is required for a GitHub Pages build.");
}

const basePath = isGitHubPagesBuild ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
