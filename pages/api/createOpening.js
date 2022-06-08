import { client as sanityClient } from '../../lib/client'
import uuid from "react-uuid";

export default async (req, res) => {

  const { client, email, neededCandidates, skills } = req.body;
  let _id = uuid();
  let _skills = [];

  for (let i = 0; i < skills.length; i++) {
    _skills.push({
      _key: skills[i],
      _ref: `${_id}-opening`,
      _type: "reference",
    });  
  }

  const model = {
    _id: `${_id}-opening`,
    _type: "openings",
    client: client,
    neededCandidates: neededCandidates,
    email: email,
    isActive: true,
    skills: _skills,
  };

  try {
    await sanityClient.createIfNotExists(model);

    res.status(200).send('Successful')
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
