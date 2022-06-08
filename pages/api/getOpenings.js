import { client } from '../../lib/client'

export default async (req, res) => {
  const query = `*[_type == "openings" && isActive == true] {
    client,
    email,
    _id,
    neededCandidates,
    isActive,
    skills[]->{
      name
    }
  }`;

  try {
    const sanityResponse = await client.fetch(query)
    res.status(200).send(await sanityResponse)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
