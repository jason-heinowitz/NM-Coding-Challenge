import express, { Router, Request, Response } from 'express';

import controller from './controller';

const router: Router = express.Router();

router.post('/', controller.validateFields, controller.doesUsernameExist, controller.createUser, controller.createSession, (req: Request, res: Response) => res.status(200).json({ message: 'Registration successful.' }));

// only enable deleting users this way during testing
if (process.env.NODE_ENV === 'test') {
  router.delete('/cleanup', controller.deleteUser, (req: Request, res: Response) => res.status(200).json({ message: 'Deleted user successfully.' }));
}

export default router;
