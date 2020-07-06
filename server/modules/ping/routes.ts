import express, { Request, Response } from 'express';

const router: express.Router = express.Router();

// return 200 on ping
router.get('/', (req: Request, res: Response) => res.status(200).json({ okay: true }));

export default router;
