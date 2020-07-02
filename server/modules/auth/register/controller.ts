import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { db } from '../db';

require('dotenv').config();

interface RegistrationController {
  validateFields(req: Request, res: Response, next: NextFunction): void;
  doesUsernameExist(req: Request, res: Response, next: NextFunction): void;
  createUser(req: Request, res: Response, next: NextFunction): void;
  deleteUser(req: Request, res: Response, next: NextFunction): void;
  createSession(req: Request, res: Response, next: NextFunction): void;
}

const controller: RegistrationController = {
  /**
   * Ensures all fields are passed to server correctly, returning error messages if found out of spec
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

    // confirm password and confirmPassword are matching before continuing
    if (password !== confirmPassword) {
      return next({
        log: 'User passed mismatched passwords',
        code: 409,
        message: 'Password and confirm password do not match.',
      });
    }

    // all fields are present and passing, continue
    res.locals = { username, password };
    return next();
  },
  /**
   * Checks if username is already in use, returning error if true
   */
  doesUsernameExist(req: Request, res: Response, next: NextFunction): void {
    const { username } = res.locals;

    const query = `SELECT id FROM users WHERE username='${username}'`;
    db.query(query, (err, response) => {
      // if error while querying db, return something other than boolean
      console.log(err);
      if (err) {
        return next({
          log: 'Error querying database for username during registration',
          code: 500,
          message: 'Could not register at this time.',
        });
      }

      // if any results come back, username is taken
      if (response.rows.length > 0) {
        return next({
          log: 'User passed username that is already in use',
          code: 409,
          message: 'Username is already in use.',
        });
      }

      // username is not registered, continue
      return next();
    });
    // OUTSIDE QUERY
  },
  /**
   * Hash password, then create user in database
   */
  createUser(req: Request, res: Response, next: NextFunction): void {
    // hash password before creating user
    const { username, password } = res.locals;
    bcrypt.hash(password, 11, (err: Error, hashedPassword: string) => {
      if (err) {
        return next({
          log: 'Error when hashing user\'s password during registration',
          code: 500,
          message: 'Could not register at this time.',
        });
      }

      const query = `INSERT INTO users (username, password) VALUES ('${username}','${hashedPassword}')`;
      db.query(query, (qErr) => {
        if (qErr) {
          return next({
            log: 'Error when adding user to database',
            code: 500,
            message: 'Could not register at this time.',
          });
        }

        // user successfully added to database
        return next();
      });
      // OUTSIDE QUERY
    });
    // OUTSIDE HASHING
  },
  /**
   * During testing, delete test user after each test run to ensure consistant tests
   */
  deleteUser(req: Request, res: Response, next: NextFunction): void {
    const { username } = req.body;
    const query = `DELETE FROM users WHERE username='${username}'`;
    db.query(query, (err) => {
      // err will only be thrown when query is syntaxically incorrect or cannot connect to server
      if (err) {
        return next({
          log: 'Failed to delete user from datbase during testing',
          code: 500,
          message: 'Failed to delete user from database during testing.',
        });
      }

      // deleted test user from database successfully
      return next();
    });
    // OUTSIDE QUERY
  },
  /**
   * Automatically sign user in upon successful registration
   */
  createSession(req: Request, res: Response, next: NextFunction): void {
    const { username } = res.locals;

    jwt.sign({ username }, process.env.JWT_SECRET, (err, signedJWT) => {
      if (err) {
        return next({
          log: 'Error while signing JWT after registration',
          code: 500,
          message: 'Could not create session at this time.',
        });
      }

      res.cookie('token', signedJWT, {
        httpOnly: true,
      });

      return next();
    });
    // OUTSIDE JWT SIGNATURE
  },
};

export default controller;
