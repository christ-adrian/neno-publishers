import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { ENV } from "./src/env";

const projectId = ENV.PUBLIC_SANITY_PROJECT_ID;
const dataset = ENV.PUBLIC_SANITY_DATASET;

if (!(projectId && dataset)) {
	throw new Error(
		"Set both PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET before loading the Sanity Studio."
	);
}

export default defineConfig({
	dataset,
	name: "neno-publishers",
	plugins: [structureTool()],
	projectId,
	schema: { types: [] },
	title: "Neno Publishers",
});
