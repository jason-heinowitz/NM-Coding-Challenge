import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config();

interface ValidationController {
  validateUserSession(req: Request, res: Response, next: NextFunction): void;
}

const controller: ValidationController = {
  validateUserSession(req: Request, res: Response, next: NextFunction): void {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, (err, { username }) => {
      if (err || !username) {
        return next({
          log: 'User attempted to validate with invalid JWT',
          code: 403,
          message: 'Invalid user session.',
        });
      }

      return next();
    });
    // OUTSIDE JWT VERIFY
  },
};

export default controller;
