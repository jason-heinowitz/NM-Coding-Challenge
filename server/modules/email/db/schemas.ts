const schemas = {
  email: {
    from: { type: String, required: true },
    to: { type: [String], required: true },
    ignore: { type: [String], required: false },
    subject: { type: String, required: false },
    body: { type: String, required: false },
  },
};

export default schemas;
