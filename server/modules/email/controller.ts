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
  user: string;
  subject?: string;
  body?: string;
}

const controller: EmailController = {
  /**
   * Validate user's current JWT, returning error if invalid
   */
  validateUserSession(req: Request, res: Response, next: NextFunction): void {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, (err, userObj) => {
      // if invalid jwt
      if (err || !userObj) {
        return next({
          log: 'User attempted to validate with invalid JWT',
          code: 403,
          message: 'Invalid user session.',
        });
      }

      res.locals.username = userObj.username;
      return next();
    });
    // OUTSIDE JWT VERIFY
  },
  /**
   * Get all emails where the current user is the/a recipient
   */
  getEmails(req: Request, res: Response, next: NextFunction): void {
    const { username } = res.locals;

    // get all emails where the recipient is the current user
    db.emails.find({ user: `${username}@postql.io` }, (err: Error, results: Email[]) => {
      if (err) {
        return next({
          log: 'Error retrieving user\'s emails',
          code: 500,
          message: 'Could not retrieve emails at this time.',
        });
      }

      res.locals.emails = results;
      // emails successfully found, continue
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

    // add one email to database for each recipient
    const emails = [];

    // create an email for each recipient of the email to enable induvidual deletions of an email from user's inbox
    recipients.forEach((recipient: string) => {
      const email = {
        from: `${username}@postql.io`,
        user: `${recipient}`,
        to: recipients,
        subject,
        body,
      };

      // push each Promise create into an array
      emails.push(db.emails.create(email));
    });

    // wait until all db creates have completed before continuing
    Promise.all(emails)
      .then(() => next())
      .catch(() => next({
        log: 'Failed to save email to database',
        code: 500,
        message: 'Cannot send email at this time.',
      }));
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
      if (foundEmail.user !== `${username}@postql.io`) {
        return next({
          log: 'User attempted to delete email that they weren\'t a recipient of',
          code: 403,
          message: 'Cannot delete an email you have not recieved.',
        });
      }

      // update email with new ignore list
      db.emails.deleteOne({ _id: id }, (deleteErr) => {
        if (deleteErr) {
          return next({
            log: 'Error deleting email from database',
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
