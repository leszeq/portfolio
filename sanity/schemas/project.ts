import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'seoName',
      title: 'Nazwa pliku (SEO) - ukryta dla użytkownika',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary (Short description)',
      type: 'text',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description (Project Details)',
      type: 'text',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Expansion',
      type: 'array' as const,
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array' as const,
      of: [{type: 'reference', to: {type: 'skill'}}],
    }),
    defineField({
      name: 'linkToBuild',
      title: 'LinkToBuild',
      type: 'url',
    }),
    // defineField({
    // 	name: 'linkToBuild',
    // 	title: 'LinkToBuild',
    // 	type: 'url',
    // }),
  ],
})
