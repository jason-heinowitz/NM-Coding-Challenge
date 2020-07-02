import express, { Router } from 'express';

import { register } from './register';
import { validate } from './validate';

const router: Router = express.Router();

router.use('/register', register);
router.use('/validate', validate);

export default router;
