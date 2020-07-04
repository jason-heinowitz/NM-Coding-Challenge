import express, { Router, Request, Response } from 'express';
import controller from './controller';

const router: Router = express.Router();

router.get('/', controller.validateUserSession, (req: Request, res: Response) => res.status(200).json({ message: 'User validated.' }));

export default router;
