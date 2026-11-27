// @ts-check
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import varlockAstroIntegration from "@varlock/astro-integration";
import { defineConfig } from "astro/config";
import { ENV } from "varlock/env";

const sanityProjectId = ENV.PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = ENV.PUBLIC_SANITY_DATASET;

if (Boolean(sanityProjectId) !== Boolean(sanityDataset)) {
  throw new Error(
    "Set both PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET to enable the embedded Sanity Studio."
  );
}

const sanityIntegrations =
  sanityProjectId && sanityDataset
    ? [
        sanity({
          apiVersion: "2026-11-26",
          dataset: sanityDataset,
          injectTypes: true,
          projectId: sanityProjectId,
          studioBasePath: "/studio",
          studioRouterHistory: "browser",
          useCdn: true,
        }),
        react(),
      ]
    : [];

// https://astro.build/config
export default defineConfig({
  site: "https://nenopublishers.co.ke",
  image: {
    remotePatterns: [
      {
        hostname: "nenopublishers.co.ke",
        pathname: "/wp-content/uploads/2021/02/Mary-Maganga-team.jpg",
        port: "",
        protocol: "https",
      },
      {
        hostname: "nenopublishers.co.ke",
        pathname: "/wp-content/uploads/2021/02/Samuel-Kanja-team.jpg",
        port: "",
        protocol: "https",
      },
      {
        hostname: "nenopublishers.co.ke",
        pathname: "/wp-content/uploads/2021/02/Wilson-Macharia.jpg",
        port: "",
        protocol: "https",
      },
    ],
  },
  integrations: [
    varlockAstroIntegration({ ssrInjectMode: "auto-load" }),
    ...sanityIntegrations,
  ],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
