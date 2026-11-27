import type { PortableTextBlock } from "@portabletext/types";
import { BOOK_BY_SLUG_QUERY, BOOKS_QUERY } from "./queries";
import { getSanityClient, type SanityImage, sanityImageUrl } from "./sanity";

export type BookCover = SanityImage;

export type BookListItem = Pick<BookSummary, "coverImage" | "slug" | "title">;

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
	otherBooks: BookListItem[];
	pages: number | null;
}

export async function getCatalog(): Promise<BookSummary[]> {
	return await getSanityClient().fetch<BookSummary[]>(BOOKS_QUERY);
}

export async function getBook(slug: string): Promise<BookDetails | null> {
	return await getSanityClient().fetch<BookDetails | null>(BOOK_BY_SLUG_QUERY, {
		slug,
	});
}

export function bookCoverUrl(cover: BookCover | null, width: number) {
	return sanityImageUrl(cover, width);
}
