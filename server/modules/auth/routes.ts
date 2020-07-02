import express, { Router } from 'express';

import { register } from './register';

const router: Router = express.Router();

router.use('/register', register);

export default router;
