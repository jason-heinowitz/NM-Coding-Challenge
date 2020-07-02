import { Request, Response, NextFunction } from 'express';

interface RegistrationController {
  validateFields(req: Request, res: Response, next: NextFunction): void;
}

const controller: RegistrationController = {
  /**
   * Ensures all fields are passed to server correctly, returning error messages if found out of standard
   */
  validateFields(req: Request, res: Response, next: NextFunction): void {
    const { username, password, confirmPassword } = req.body;

    // username field validations
    if (username === undefined) {
      return next({
        log: 'User did not pass username field',
        code: 400,
        message: 'Username is required.',
      });
    }
    if (username.length === 0) {
      return next({
        log: 'User passed empty username field',
        code: 400,
        message: 'Username cannot be empty.',
      });
    }

    // password field validations
    if (password === undefined) {
      return next({
        log: 'User did not pass password field',
        code: 400,
        message: 'Password is required.',
      });
    }
    if (password.length === 0) {
      return next({
        log: 'User passed empty password field',
        code: 400,
        message: 'Password does not meet requirements.',
      });
    }

    // confirm password validations
    if (confirmPassword === undefined) {
      return next({
        log: 'User did not pass confirmPassword field',
        code: 400,
        message: 'Confirm password is required.',
      });
    }
    if (confirmPassword.length === 0) {
      return next({
        log: 'User passed empty confirmPassword field',
        code: 400,
        message: 'Confirm password does not match password.',
      });
    }

    return next();
  },
};

export default controller;
