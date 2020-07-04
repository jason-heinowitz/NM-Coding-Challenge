import express, { Router } from 'express';

import { register } from './register';
import { login } from './login';
import { logout } from './logout';
import { validate } from './validate';

const router: Router = express.Router();

router.use('/register', register);
router.use('/login', login);
router.use('/logout', logout);
router.use('/validate', validate);

export default router;
