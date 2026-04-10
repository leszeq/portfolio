import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'experience',
	title: 'Experience',
	type: 'document',
	fields: [
		defineField({
			name: 'jobTitle',
			title: 'JobTitle',
			type: 'string',
		}),
		defineField({
			name: 'companyImage',
			title: 'CompanyImage',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'company',
			title: 'Company',
			type: 'text',
		}),
		defineField({
			name: 'dateEnded',
			title: 'DateEnded',
			type: 'date',
		}),
		defineField({
			name: 'isCurrentlyWorkingHere',
			title: 'IsCurrentlyWorkingHere',
			type: 'boolean',
		}),
		defineField({
			name: 'technologies',
			title: 'Technologies',
			type: 'array' as const,
			of: [{ type: 'reference', to: { type: 'skill' } }],
		}),
		defineField({
			name: 'points',
			title: 'Points',
			type: 'array' as const,
			of: [{ type: 'string' as const }],
		}),
	],
});
