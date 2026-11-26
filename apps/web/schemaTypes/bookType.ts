import { BookIcon } from "@sanity/icons/Book";
import { defineArrayMember, defineField, defineType } from "sanity";

export const bookType = defineType({
	fields: [
		defineField({
			name: "title",
			title: "Book Title",
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
			name: "authors",
			of: [defineArrayMember({ to: [{ type: "author" }], type: "reference" })],
			title: "Author(s)",
			type: "array",
			validation: (rule) => rule.required().min(1),
		}),
		defineField({
			fields: [
				defineField({ name: "alt", title: "Alternative Text", type: "string" }),
			],
			name: "coverImage",
			options: { hotspot: true },
			title: "Book Cover",
			type: "image",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "category",
			options: {
				layout: "dropdown",
				list: [
					{ title: "Leadership & Management", value: "leadership" },
					{ title: "Christian Literature", value: "christian-literature" },
					{ title: "Self-Help & Parenting", value: "self-help-parenting" },
					{ title: "Poetry & Kids", value: "poetry-kids" },
					{ title: "Fiction & African Heritage", value: "fiction-heritage" },
					{ title: "Academic & Textbooks", value: "academic-textbooks" },
					{ title: "Biography & Memoir", value: "biography-memoir" },
				],
			},
			title: "Category / Genre",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			description:
				"One or two sentences for catalog cards and search previews.",
			name: "summary",
			rows: 3,
			title: "Short Summary",
			type: "text",
			validation: (rule) => rule.required().max(260),
		}),
		defineField({
			name: "description",
			of: [defineArrayMember({ type: "block" })],
			title: "Full Synopsis",
			type: "array",
		}),
		defineField({
			name: "publishedYear",
			title: "Publication Year",
			type: "number",
			validation: (rule) =>
				rule
					.integer()
					.min(1990)
					.max(new Date().getFullYear() + 1),
		}),
		defineField({ name: "isbn", title: "ISBN", type: "string" }),
		defineField({
			name: "pages",
			title: "Page Count",
			type: "number",
			validation: (rule) => rule.integer().positive(),
		}),
		defineField({
			description: "Optional retail price in Kenyan shillings.",
			name: "priceKsh",
			title: "Price (KSH)",
			type: "number",
			validation: (rule) => rule.positive(),
		}),
		defineField({
			initialValue: false,
			name: "featured",
			title: "Featured on Homepage",
			type: "boolean",
		}),
	],
	icon: BookIcon,
	name: "book",
	preview: {
		prepare({ title, author0, author1, media }) {
			const authors = [author0, author1].filter(Boolean).join(", ");
			return {
				media,
				subtitle: authors ? `by ${authors}` : "No author assigned",
				title,
			};
		},
		select: {
			author0: "authors.0.name",
			author1: "authors.1.name",
			media: "coverImage",
			title: "title",
		},
	},
	type: "document",
});
