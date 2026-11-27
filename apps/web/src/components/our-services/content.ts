// Source: https://nenopublishers.co.ke/services-3/

export type ServiceSlug = "printing" | "advisory" | "publishing";

export type Service = {
	slug: ServiceSlug;
	title: string;
	headline: string;
	description: string;
	offerings: readonly {
		title: string;
		description: string;


	}[];
};

export const services: readonly Service[] = [
	{
		slug: "printing",
		title: "Printing Services",
		headline: "Books and more, in print.",
		description:
			"Neno prints books, publications and everyday materials, from textbooks and magazines to calendars, letterheads and flyers.",
		offerings: [
			{
				title: "Book printing",
				description: "Motivational books, textbooks, self-help books, autobiographies, poetry and novels, and Christian literature.",


			},
			{
				title: "Magazines",
				description: "Print magazines for readers, subscribers, and events.",


			},
			{
				title: "Calendars",
				description: "Print calendars for offices, organizations, and promotions.",


			},
			{
				title: "Stationery and promotional print",
				description: "Letterheads, bookmarks, flyers, and diaries.",


			},
		],
	},
	{
		slug: "advisory",
		title: "Advisory Services",
		headline: "Guidance for your next book decision.",
		description:
			"Get advice on manuscript development, title selection, book pricing and book marketing.",
		offerings: [
			{
				title: "Book pricing",
				description: "Set a price that fits your audience and publishing goals.",


			},
			{
				title: "Book marketing",
				description: "Plan how to promote your book and reach readers.",


			},
			{
				title: "Book title selection",
				description: "Choose a title that reflects your book and appeals to readers.",


			},
			{
				title: "Manuscript development",
				description: "Develop your ideas and strengthen the structure of your draft.",


			},
		],
	},
	{
		slug: "publishing",
		title: "Publishing Services",
		headline: "Prepare your manuscript for publication.",
		description:
			"Publishing support includes manuscript review, development, translation, editing, proofreading, typesetting and cover graphic design.",
		offerings: [
			{
				title: "Manuscript review and evaluation",
				description: "Get feedback on your manuscript’s strengths and what needs work.",


			},
			{
				title: "Manuscript translation and development",
				description: "Translate or develop your manuscript for its intended readers.",


			},
			{
				title: "Cover graphic design",
				description: "Create a cover that suits your book’s subject and audience.",


			},
			{
				title: "Proofreading",
				description: "Catch spelling, punctuation, and other errors before publication.",


			},
			{
				title: "Typesetting",
				description: "Arrange text and images into a consistent, readable page layout.",


			},
			{
				title: "Editing",
				description: "Improve the clarity, flow, and consistency of your manuscript.",


			},
		],
	},
];
