import mongoose from 'mongoose';

import schemas from './schemas';

require('dotenv').config();

// connect to mongo DB
mongoose.connect(`${process.env.EMAIL_DATABASE}${'?retryWrites=true&w=majority'}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });

// create email schema
const emailSchema = new mongoose.Schema(schemas.email);

// create usable model
const emails = mongoose.model('Email', emailSchema);

const models = {
  emails,
};

export default models;
