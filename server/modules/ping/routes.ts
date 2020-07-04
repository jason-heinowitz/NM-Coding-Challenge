import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

router.get('/', (req: Request, res: Response) => res.status(200).json({ okay: true }));

export default router;
