import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

export const authorType = defineType({
	fields: [
		defineField({
			description: "e.g. Dr. Salome Gitoho or Samuel N. Kanja",
			name: "name",
			title: "Full Name",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			options: { maxLength: 96, source: "name" },
			type: "slug",
			validation: (rule) => rule.required(),
		}),
		defineField({
			description:
				'Optional subtitle or academic credentials (e.g. "PhD, Counseling Psychologist").',
			name: "credentials",
			title: "Credentials / Title",
			type: "string",
		}),
		defineField({
			fields: [
				defineField({
					description: "Use the author name if left blank.",
					name: "alt",
					title: "Alternative Text",
					type: "string",
				}),
			],
			name: "photo",
			options: { hotspot: true },
			title: "Portrait Photo",
			type: "image",
		}),
		defineField({
			description: "Used on author directory cards and in search descriptions.",
			name: "shortBio",
			rows: 3,
			type: "text",
			validation: (rule) => rule.max(220),
		}),
		defineField({
			name: "bio",
			of: [defineArrayMember({ type: "block" })],
			title: "Full Biography",
			type: "array",
		}),
		defineField({
			initialValue: false,
			name: "featured",
			title: "Featured Author",
			type: "boolean",
		}),
	],
	icon: UserIcon,
	name: "author",
	preview: {
		select: { media: "photo", subtitle: "credentials", title: "name" },
	},
	type: "document",
});
