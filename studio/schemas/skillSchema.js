export const skillSchema = {
  name: 'skills',
  type: 'document',
  title: 'Skills',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active?',
    }
  ]
}