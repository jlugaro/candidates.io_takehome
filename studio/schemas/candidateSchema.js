export const candidateSchema = {
  name: "candidates",
  type: "document",
  title: "Candidates",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "phone",
      type: "string",
      title: "Phone",
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "isActive",
      type: "boolean",
      title: "Is Active?",
    },
    {
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "skills" },
        },
      ],
    },
  ],
};
