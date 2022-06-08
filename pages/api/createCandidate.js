import { client } from '../../lib/client'
import uuid from "react-uuid";

export default async (req, res) => {

  const { name, email, phone, skills } = req.body
  let _id = uuid();
  let _skills = [];

  for (let i = 0; i < skills.length; i++) {
    _skills.push({
      _key: skills[i],
      _ref: `${_id}-candidate`,
      _type: "reference",
    });  
  }

  const model = {
    _id: `${_id}-candidate`,
    _type: "candidates",
    name: name,
    phone: phone,
    email: email,
    isActive: true,
    skills: _skills,
  };

  try {
    await client.createIfNotExists(model);

    res.status(200).send('Successful')
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
