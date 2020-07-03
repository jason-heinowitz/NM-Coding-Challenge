import express, { Router, Request, Response } from 'express';

import controller from './controller';

const router: Router = express.Router();

// all email actions require the user be logged in
router.use('*', controller.validateUserSession);

router.get('/', controller.getEmails, (req, res) => res.status(200).json({ emails: res.locals.emails }));

router.post('/', controller.sendEmail, (req: Request, res: Response) => res.status(200).json({ message: 'Email successfully sent.' }));

router.delete('/', controller.deleteEmail, (req: Request, res: Response) => res.status(200).json({ message: 'Successfully deleted email.' }));

export default router;
