import { CommentIcon } from "@sanity/icons/Comment";
import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
	fields: [
		defineField({
			name: "quote",
			rows: 4,
			type: "text",
			validation: (rule) => rule.required().min(20).max(500),
		}),
		defineField({
			name: "clientName",
			title: "Client / Author Name",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			description: 'e.g. "Author" or "Managing Director, Evangel Publishing"',
			initialValue: "Author",
			name: "clientRole",
			title: "Role or Organization",
			type: "string",
		}),
		defineField({
			fields: [
				defineField({ name: "alt", title: "Alternative Text", type: "string" }),
			],
			name: "avatar",
			options: { hotspot: true },
			title: "Client Photo (Optional)",
			type: "image",
		}),
		defineField({
			description:
				"Link to a book if this testimonial is about a specific publication.",
			name: "relatedBook",
			title: "Related Book (Optional)",
			to: [{ type: "book" }],
			type: "reference",
		}),
		defineField({
			initialValue: true,
			name: "featured",
			title: "Show on Homepage",
			type: "boolean",
		}),
		defineField({ initialValue: 1, name: "displayOrder", type: "number" }),
	],
	icon: CommentIcon,
	name: "testimonial",
	preview: {
		select: { media: "avatar", subtitle: "quote", title: "clientName" },
	},
	type: "document",
});
