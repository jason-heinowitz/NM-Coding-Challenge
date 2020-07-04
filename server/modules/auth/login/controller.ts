import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { db } from '../db';

require('dotenv').config();

interface LoginController {
  checkFields(req: Request, res: Response, next: NextFunction): void;
  checkUsernamePassword(req: Request, res: Response, next: NextFunction): void;
  createSession(req: Request, res: Response, next: NextFunction): void;
}

const controller: LoginController = {
  /**
   * Verify that all user-supplied fields are within spec, else throw error
   */
  checkFields(req: Request, res: Response, next: NextFunction): void {
    const { username, password } = req.body;

    if (username === undefined) {
      return next({
        log: 'User did not pass username field',
        code: 403,
        message: 'Username is required.',
      });
    }

    if (username.length === 0) {
      return next({
        log: 'User passed empty username field',
        code: 403,
        message: 'Username cannot be empty.',
      });
    }

    if (password === undefined) {
      return next({
        log: 'User did not pass password field',
        code: 403,
        message: 'Password is required.',
      });
    }

    if (password.length === 0) {
      return next({
        log: 'User passed empty password field',
        code: 403,
        message: 'Password cannot be empty.',
      });
    }

    return next();
  },
  /**
   * Check if user-supplied username and password match username and password combo in database
   */
  checkUsernamePassword(req: Request, res: Response, next: NextFunction): void {
    const { username, password } = req.body;

    const query = `SELECT password FROM users WHERE username='${username}'`;
    db.query(query, (err, response) => {
      if (err) {
        return next({
          log: 'Query failed when checking username during login',
          code: 500,
          message: 'Could not log in at this time.',
        });
      }

      // if username does not exist in database
      if (response.rows.length === 0) {
        return next({
          log: 'Username attempted to log in with username that is not registered',
          code: 403,
          message: 'Username and/or password incorrect.',
        });
      }

      // user exists in database, check password
      const hashedPassword = response.rows[0].password;

      bcrypt.compare(password, hashedPassword, (bErr: Error, success: boolean) => {
        if (bErr) {
          return next({
            log: 'Bcrypt threw error when comparing hashed password against user-supplied password',
            code: 403,
            message: 'Username and/or password incorrect.',
          });
        }

        // if de-hashed password and user-supplied password do not match
        if (!success) {
          return next({
            log: 'User-supplied password did not match password in database',
            code: 403,
            message: 'Username and/or password incorrect.',
          });
        }

        // if username and password combo match database combo
        return next();
      });
      // OUTSIDE BCRYPT COMPARE
    });
    // OUTSIDE QUERY
  },
  /**
   * username and password match, create user session
   */
  createSession(req: Request, res: Response, next: NextFunction): void {
    const { username } = req.body;

    // create jwt
    jwt.sign({ username }, process.env.JWT_SECRET, (err, signedJWT) => {
      if (err) {
        return next({
          log: 'Error while signing JWT after login',
          code: 500,
          message: 'Could not create session at this time.',
        });
      }

      // set jwt on next response
      res.cookie('token', signedJWT, {
        httpOnly: true,
      });

      return next();
    });
  },
};

export default controller;
