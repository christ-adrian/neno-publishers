// Source: https://nenopublishers.co.ke/services-3/

export type ServiceSlug = "printing" | "advisory" | "publishing";

export type Service = {
	slug: ServiceSlug;
	title: string;
	headline: string;
	description: string;
	offerings: readonly string[];
};

export const services: readonly Service[] = [
	{
		slug: "printing",
		title: "Printing Services",
		headline: "Books and more, in print.",
		description:
			"Neno prints books, publications and everyday materials, from textbooks and magazines to calendars, letterheads and flyers.",
		offerings: [
			"Motivational books",
			"Textbooks",
			"Self-help books",
			"Autobiographies",
			"Poetry and novels",
			"Christian literature",
			"Magazines",
			"Calendars",
			"Letterheads",
			"Bookmarks",
			"Flyers",
			"Diaries",
		],
	},
	{
		slug: "advisory",
		title: "Advisory Services",
		headline: "Guidance for your next book decision.",
		description:
			"Get advice on manuscript development, title selection, book pricing and book marketing.",
		offerings: [
			"Book pricing",
			"Book marketing",
			"Book title selection",
			"Manuscript development",
		],
	},
	{
		slug: "publishing",
		title: "Publishing Services",
		headline: "Prepare your manuscript for publication.",
		description:
			"Publishing support includes manuscript review, development, translation, editing, proofreading, typesetting and cover graphic design.",
		offerings: [
			"Manuscript review and evaluation",
			"Manuscript translation and development",
			"Cover graphic design",
			"Proofreading",
			"Typesetting",
			"Editing",
		],
	},
];
