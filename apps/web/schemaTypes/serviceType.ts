import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

const servicePillars = [
	{ title: "Publishing Services", value: "publishing" },
	{ title: "Advisory Services", value: "advisory" },
	{ title: "Printing Services", value: "printing" },
];

export const serviceType = defineType({
	fields: [
		defineField({
			description:
				"e.g. Manuscript Review & Evaluation, Book Pricing, Commercial Print",
			name: "title",
			title: "Service Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			options: { maxLength: 96, source: "title" },
			type: "slug",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "category",
			options: { layout: "radio", list: servicePillars },
			title: "Service Pillar",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			hidden: ({ document }) => document?.category !== "printing",
			name: "printingType",
			options: {
				layout: "radio",
				list: [
					{ title: "Book Printing", value: "book-printing" },
					{ title: "Commercial & Corporate Print", value: "corporate-print" },
				],
			},
			title: "Printing Sub-Category",
			type: "string",
		}),
		defineField({
			name: "shortDescription",
			rows: 3,
			type: "text",
			validation: (rule) => rule.required().max(240),
		}),
		defineField({
			description:
				'Short bullet points (e.g. "Proofreading", "Typesetting", "Cover & Graphic Design").',
			name: "deliverables",
			of: [defineArrayMember({ type: "string" })],
			title: "Key Deliverables / Items Included",
			type: "array",
		}),
		defineField({
			description:
				"Optional value used by a contact link to preselect this service.",
			name: "contactParam",
			title: "Contact Form Value",
			type: "string",
		}),
		defineField({
			description: "Lower numbers appear first within each pillar.",
			initialValue: 10,
			name: "displayOrder",
			type: "number",
		}),
		defineField({
			initialValue: false,
			name: "featured",
			title: "Show on Homepage",
			type: "boolean",
		}),
	],
	icon: CaseIcon,
	name: "service",
	preview: {
		prepare({ title, category }) {
			const pillar = servicePillars.find(({ value }) => value === category);
			return { subtitle: pillar?.title ?? category ?? "Uncategorized", title };
		},
		select: { category: "category", title: "title" },
	},
	type: "document",
});
