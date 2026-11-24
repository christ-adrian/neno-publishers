import node from "@astrojs/node";
// @ts-check
import tailwindcss from "@tailwindcss/vite";
import varlockAstroIntegration from "@varlock/astro-integration";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
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
  integrations: [varlockAstroIntegration({ ssrInjectMode: "auto-load" })],
  output: "server",
  adapter: node({ mode: "standalone" }),
  vite: {
    plugins: [tailwindcss()],
  },
});
