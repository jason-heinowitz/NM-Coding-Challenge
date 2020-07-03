import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config();

interface LogoutController {
  validateUserSession(req: Request, res: Response, next: NextFunction): void;
  invalidateSession(req: Request, res: Response, next: NextFunction): void;
}

const controller: LogoutController = {
  /**
   * Check if user is already logged in first, returning error if they are not
   */
  validateUserSession(req: Request, res: Response, next: NextFunction): void {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return next({
          log: 'User attempted to log out with invalid token',
          code: 205,
          message: 'Cannot log out before logging in.',
        });
      }

      return next();
    });
    // OUTSIDE JWT VERIFY
  },
  /**
   * Invalidate current user session by deleting cookie from next response
   */
  invalidateSession(req: Request, res: Response, next: NextFunction): void {
    res.clearCookie('token');

    return next();
  },
};

export default controller;
