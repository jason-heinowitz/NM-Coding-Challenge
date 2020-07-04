import express, { Router, Request, Response } from 'express';

import controller from './controller';

const router: Router = express.Router();

router.post('/', controller.validateUserSession, controller.invalidateSession, (req: Request, res: Response) => res.status(200).json({ message: 'Successfully logged out.' }));

export default router;
