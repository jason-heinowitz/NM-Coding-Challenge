import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { db } from './db';

require('dotenv').config();

interface EmailController {
  validateUserSession(req: Request, res: Response, next: NextFunction): void;
  getEmails(req: Request, res: Response, next: NextFunction): void;
  sendEmail(req: Request, res: Response, next: NextFunction): void;
  deleteEmail(req: Request, res: Response, next: NextFunction): void;
}

interface Email {
  from: string;
  to: string[];
  ignore: string[];
  subject?: string;
  body?: string;
}

const controller: EmailController = {
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

        res.locals.username = username;
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
  /**
   * Get all emails where the current user is the/a recipient
   */
  getEmails(req: Request, res: Response, next: NextFunction): void {
    const { username } = res.locals;

    // get all emails where the recipient is the current user
    db.emails.find({ to: `${username}@teamcatsnake.com` }, (err: Error, results: Email[]) => {
      if (err) {
        return next({
          log: 'Error retrieving user\'s emails',
          code: 500,
          message: 'Could not retrieve emails at this time.',
        });
      }

      // emails successfully found, continue
      // only display emails that have not been deleted (ignored) by the user
      res.locals.emails = results.filter((email) => email.ignore.indexOf(`${username}@teamcatsnake.com`) < 0);
      return next();
    });
  },
  /**
   * "Send" email to user(s) via adding email to database
   */
  sendEmail(req: Request, res: Response, next: NextFunction): void {
    const { to, subject, body } = req.body;
    const { username } = res.locals;

    if (to === undefined) {
      return next({
        log: 'User did not pass any valid recipients',
        code: 400,
        message: 'At least one recipient must be added.',
      });
    }

    // split comma-delimited string on each comma, trimming extra white space on each string, then removing any empty entries
    const recipients = to.split(',').map((recipient) => recipient.trim()).filter((recipient) => recipient !== '');

    // User did not pass any valid to addresses
    if (recipients.length === 0) {
      return next({
        log: 'User did not pass any valid recipients',
        code: 400,
        message: 'At least one recipient must be added.',
      });
    }

    const email = {
      from: `${username}@teamcatsnake.com`,
      to: recipients,
      subject,
      body,
    };

    // add email to database
    db.emails.create(email, (err) => {
      if (err) {
        return next({
          log: 'Error when creating new email',
          code: 500,
          message: 'Could not send email at this time.',
        });
      }

      return next();
    });
    // OUTSIDE EMAIL CREATE
  },
  /**
   * Add user to list of users that have deleted (just ignored) an email so it does not change for other users in addition to keeping emails as permanant records
   */
  deleteEmail(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.body;
    const { username } = res.locals;

    // find email to update ignore list for
    db.emails.findById(id, (err, foundEmail: Email) => {
      if (err) {
        return next({
          log: 'Error retrieving email pre-delete',
          code: 500,
          message: 'Cannot delete email at this time.',
        });
      }

      // check if user actually received email they're attempting to update
      if (foundEmail.from.indexOf(`${username}@teamcatsnake.com`) < 0) {
        return next({
          log: 'User attempted to "delete" email that they weren\'t a recipient of',
          code: 403,
          message: 'Cannot delete an email you have not recieved.',
        });
      }

      foundEmail.ignore.push(`${username}@teamcatsnake.com`);

      // update email with new ignore list
      db.emails.updateOne({ _id: id }, { ignore: foundEmail.ignore }, (updateErr) => {
        if (updateErr) {
          return next({
            log: 'Error saving email with appended ignore',
            code: 500,
            message: 'Cannot delete email at this time.',
          });
        }

        // email has been successfully saved back to the db
        return next();
      });
    });
  },
};

export default controller;
