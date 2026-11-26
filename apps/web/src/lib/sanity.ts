import { createClient } from "@sanity/client";
import {
	createImageUrlBuilder,
	type SanityImageObject,
} from "@sanity/image-url";
import { ENV } from "../env";

export type SanityImage = SanityImageObject & { alt?: string | null };

const projectId = ENV.PUBLIC_SANITY_PROJECT_ID;
const dataset = ENV.PUBLIC_SANITY_DATASET;
const client =
	projectId && dataset
		? createClient({
				apiVersion: "2026-11-26",
				dataset,
				maxRetries: 1,
				perspective: "published",
				projectId,
				timeout: 5000,
				useCdn: true,
			})
		: null;
const imageBuilder = client && createImageUrlBuilder(client);

export function getSanityClient() {
	if (!client) {
		throw new Error("Sanity project and dataset are required.");
	}
	return client;
}

export function sanityImageUrl(image: SanityImage | null, width: number) {
	if (!(imageBuilder && image?.asset)) {
		return null;
	}

	return imageBuilder.image(image).width(width).fit("max").auto("format").url();
}
