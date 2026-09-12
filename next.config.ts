import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const usesCustomDomain = process.env.PAGES_CUSTOM_DOMAIN === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const usesRepositoryBasePath = isGitHubPagesBuild && !usesCustomDomain;

if (usesRepositoryBasePath && !repositoryName) {
  throw new Error("GITHUB_REPOSITORY is required for a GitHub Pages build.");
}

const basePath = usesRepositoryBasePath ? `/${repositoryName}` : "";

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
