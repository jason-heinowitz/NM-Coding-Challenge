const schemas = {
  email: {
    from: { type: String, required: true },
    to: { type: [String], required: true },
    user: { type: String, required: true },
    subject: { type: String, required: false },
    body: { type: String, required: false },
  },
};

export default schemas;
