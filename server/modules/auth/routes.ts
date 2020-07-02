import express, { Router } from 'express';

import { register } from './register';
import { validate } from './validate';
import { login } from './login';

const router: Router = express.Router();

router.use('/register', register);
router.use('/validate', validate);
router.use('/login', login);

export default router;
