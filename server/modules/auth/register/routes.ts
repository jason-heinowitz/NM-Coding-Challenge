import express, { Router, Request, Response } from 'express';

import controller from './controller';

const router: Router = express.Router();

router.post('/', controller.validateFields, (req: Request, res: Response) => res.status(200).json({ message: 'Registration successful.' }));

export default router;
