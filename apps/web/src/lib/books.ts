import type { PortableTextBlock } from "@portabletext/types";
import { createClient } from "@sanity/client";
import {
	createImageUrlBuilder,
	type SanityImageObject,
} from "@sanity/image-url";
import { ENV } from "../env";
import { BOOK_BY_SLUG_QUERY, BOOKS_QUERY } from "./queries";

export type BookCover = SanityImageObject & { alt?: string | null };

interface BookSummary {
	authors: { name: string }[];
	category: string | null;
	coverImage: BookCover | null;
	priceKsh: number | null;
	publishedYear: number | null;
	slug: string;
	summary: string | null;
	title: string;
}

interface BookDetails extends BookSummary {
	description: PortableTextBlock[] | null;
	isbn: string | null;
	pages: number | null;
}

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

function getClient() {
	if (!client) {
		throw new Error("Sanity project and dataset are required for the catalog.");
	}
	return client;
}

export async function getCatalog(): Promise<BookSummary[]> {
	return await getClient().fetch<BookSummary[]>(BOOKS_QUERY);
}

export async function getBook(slug: string): Promise<BookDetails | null> {
	return await getClient().fetch<BookDetails | null>(BOOK_BY_SLUG_QUERY, {
		slug,
	});
}

export function bookCoverUrl(cover: BookCover | null, width: number) {
	if (!(imageBuilder && cover?.asset)) {
		return null;
	}

	return imageBuilder.image(cover).width(width).fit("max").auto("format").url();
}
