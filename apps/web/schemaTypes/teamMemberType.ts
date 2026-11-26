import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
	fields: [
		defineField({
			name: "name",
			title: "Full Name",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			description: "e.g. Operations Manager, Editorial Manager",
			name: "role",
			title: "Job Title / Role",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			fields: [
				defineField({
					description: "Use the team member name if left blank.",
					name: "alt",
					title: "Alternative Text",
					type: "string",
				}),
			],
			name: "photo",
			options: { hotspot: true },
			title: "Portrait Photo",
			type: "image",
			validation: (rule) => rule.required(),
		}),
		defineField({
			description: "Keep to two or three sentences for the About page.",
			name: "bio",
			rows: 3,
			title: "Short Bio",
			type: "text",
			validation: (rule) => rule.max(240),
		}),
		defineField({
			description: "Lower numbers appear first.",
			initialValue: 1,
			name: "displayOrder",
			type: "number",
		}),
		defineField({
			initialValue: true,
			name: "active",
			title: "Show on Website",
			type: "boolean",
		}),
	],
	icon: UsersIcon,
	name: "teamMember",
	preview: { select: { media: "photo", subtitle: "role", title: "name" } },
	type: "document",
});
