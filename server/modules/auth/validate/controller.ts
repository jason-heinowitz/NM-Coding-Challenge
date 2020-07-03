import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config();

interface ValidationController {
  validateUserSession(req: Request, res: Response, next: NextFunction): void;
}

const controller: ValidationController = {
  /**
   * Validate user's current JWT, returning error if invalid
   */
  validateUserSession(req: Request, res: Response, next: NextFunction): void {
    const { token } = req.cookies;
    try {
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
    } catch {
      return next({
        log: 'User attempted to validate without JWT',
        code: 403,
        message: 'Invalid user session.',
      });
    }
    // OUTSIDE JWT VERIFY
  },
};

export default controller;
