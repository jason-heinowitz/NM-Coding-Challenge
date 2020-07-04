import supertest from 'supertest';
import { request } from 'express';
import app from '../index';
import { Email, LoginUser } from './models';


describe('email tests', () => {
  describe('user is not logged in', () => {
    const request = supertest(app);

    it('returns 403 when retrieving emails', (done) => {
      request
        .get('/email')
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Invalid user session.' });
        })
        .expect(403, done);
    });

    it('returns 403 when sending an email', (done) => {
      const email: Email = {
        to: 'taken@teamcatsnake.com',
        subject: 'This shouldn\'t go through',
        body: 'Hello there.',
      };

      request
        .post('/email')
        .send(email)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Invalid user session.' });
        })
        .expect(403, done);
    });

    it('returns 403 when deleting an email', (done) => {
      request
        .delete('/email')
        .send({ id: 1 })
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Invalid user session.' });
        })
        .expect(403, done);
    });
  });

  describe('user is logged in', () => {
    const request = supertest.agent(app);
    let emails = [];

    beforeAll((done) => {
      const user: LoginUser = {
        username: 'taken',
        password: 'correctPassword123',
      };

      request
        .post('/auth/login')
        .send(user)
        .expect(200, done);
    });

    it('returns 200 when retrieving emails', (done) => {
      request
        .get('/email')
        .expect('content-type', /json/)
        .expect((response) => {
          expect(Array.isArray(response.body.emails)).toBe(true);
          emails = response.body.emails;
        })
        .expect(200, done);
    });

    it('returns 200 when sending an email', (done) => {
      const email: Email = {
        to: 'taken@teamcatsnake.com',
        subject: 'Hello there',
        body: 'General Kenobi',
      };

      request
        .post('/email')
        .send(email)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'Email successfully sent.' });
        })
        .expect(200, done);
    });

    it('returns 200 when sending email with multiple recipients', (done) => {
      const email: Email = {
        to: 'taken@teamcatsnake.com, joe@teamcatsnake.com',
        subject: 'Hello there',
        body: 'General Kenobi',
      };

      request
        .post('/email')
        .send(email)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'Email successfully sent.' });
        })
        .expect(200, done);
    });

    it('returns 400 when recriptient field is not passed', (done) => {
      const email: Email = {
        subject: 'No recipient field',
        body: '',
      };

      request
        .post('/email')
        .send(email)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'At least one recipient must be added.' });
        })
        .expect(400, done);
    });

    it('returns 400 when no recipients are passed', (done) => {
      const email: Email = {
        to: '',
        subject: 'Empty recipient field',
        body: '',
      };

      request
        .post('/email')
        .send(email)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'At least one recipient must be added.' });
        })
        .expect(400, done);
    });

    it('returns 400 when no valid recipients are passed', (done) => {
      const email: Email = {
        to: '   ,    ',
        subject: 'No valid recipients',
        body: '',
      };

      request
        .post('/email')
        .send(email)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'At least one recipient must be added.' });
        })
        .expect(400, done);
    });

    it('returns 200 when deleteing an email', (done) => {
      request
        .delete('/email')
        .send({ id: emails[0]._id })
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'Successfully deleted email.' });
        })
        .expect(200, done);
    });

    afterAll((done) => {
      const email: Email = {
        to: 'taken@teamcatsnake.com',
        subject: 'Placeholder',
        body: 'Always send an email after running tests to ensure consistant delete',
      };

      request
        .post('/email')
        .send(email)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'Email successfully sent.' });
        })
        .expect(200, done);
    });
  });
});
