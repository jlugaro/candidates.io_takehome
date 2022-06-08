export const openingSchema = {
  name: "openings",
  type: "document",
  title: "Openings",
  fields: [
    {
      name: "client",
      type: "string",
      title: "Client",
    },
    {
      name: "neededCandidates",
      type: "number",
      title: "Needed Candidates",
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
    }
  ],
};
