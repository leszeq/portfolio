import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/schema'

// const projectId = process.env.SANITY_PROJECT_ID!
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/',
  name: 'Portfolio',
  title: 'portfolio',
  projectId: '8l3ahm8d',
  // projectId,
  // dataset,
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
