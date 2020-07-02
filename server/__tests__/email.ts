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
          expect(response.json).toEqual({ error: 'You must be logged in to see your emails.' });
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
          expect(response.body).toEqual({ error: 'You must be logged in to send an email.' });
        })
        .expect(403, done);
    });

    it('returns 403 when deleting an email', (done) => {
      request
        .delete('/email')
        .send({ id: 1 })
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'You must be logged in to delete an email.' });
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
          expect(typeof response.body.emails).toBe('array');
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

    it('retuns 200 when deleteing an email', (done) => {
      request
        .delete('/email')
        .send({ id: emails[0].id })
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
