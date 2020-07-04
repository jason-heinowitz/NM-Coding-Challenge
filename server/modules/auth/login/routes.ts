import express, { Router, Request, Response } from 'express';

import controller from './controller';

const router: Router = express.Router();

router.post('/', controller.checkFields, controller.checkUsernamePassword, controller.createSession, (req: Request, res: Response) => res.status(200).json({ message: 'Successfully logged in.' }));

export default router;
