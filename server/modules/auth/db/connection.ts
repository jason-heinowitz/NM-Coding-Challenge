import { Pool } from 'pg';

require('dotenv').config();

// single pool for entire application
export default new Pool({
  connectionString: process.env.USER_DATABASE,
});
