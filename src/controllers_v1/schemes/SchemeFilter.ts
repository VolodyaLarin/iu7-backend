export const SchemeFilter = {
  type: "object",
  properties: {
    date: {
      type: "object",
      properties: {
        lt: { type: "string" },
        gt: { type: "string" },
      },
      required: [],
    },
    group: { type: "string" },
    type: { type: "string" },
  },
  required: [],
  additionalProperties: true,
};
