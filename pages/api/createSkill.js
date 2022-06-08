import { client as sanityClient } from '../../lib/client'
import uuid from 'react-uuid'

export default async (req, res) => {

  const { name } = req.body;
  let _id = uuid();

  const model = {
    _id: `${_id}-skill`,
    _type: "skills",
    name: name,
    isActive: true,
  };

  try {
    await sanityClient.createIfNotExists(model);

    res.status(200).send('Successful')
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
