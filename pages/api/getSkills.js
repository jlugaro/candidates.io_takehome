import { client } from '../../lib/client'

export default async (req, res) => {
  const query = `*[_type == "skills" && isActive == true] {
    name
  }`;

  try {
    const sanityResponse = await client.fetch(query)
    res.status(200).send(await sanityResponse)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
