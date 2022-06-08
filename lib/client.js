import sanityClient from '@sanity/client'
console.log(process.env.SANITY_PROJECT_ID)
export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "v1",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});
