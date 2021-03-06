import supertest from 'supertest';
import app from '../index';
import { RegisterUser, LoginUser } from './models';

const request = supertest(app);

describe('authentication tests', () => {
  describe('/auth/register', () => {
    it('returns 400 when username is not supplied', (done) => {
      const user: RegisterUser = {
        password: 'pass',
        confirmPassword: 'pass',
      };

      request
        .post('/auth/register')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Username is required.' });
        })
        .expect(400, done);
    });

    it('returns 400 when username is empty', (done) => {
      const user: RegisterUser = {
        username: '',
        password: 'pass',
        confirmPassword: 'pass',
      };

      request
        .post('/auth/register')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Username cannot be empty.' });
        })
        .expect(400, done);
    });

    it('returns 409 when username is already in use', (done) => {
      const user: RegisterUser = {
        username: 'taken',
        password: 'pass',
        confirmPassword: 'pass',
      };

      request
        .post('/auth/register')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Username is already in use.' });
        })
        .expect(409, done);
    });

    it('returns 400 when password is not supplied', (done) => {
      const user: RegisterUser = {
        username: 'test',
        confirmPassword: 'pass',
      };

      request
        .post('/auth/register')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Password is required.' });
        })
        .expect(400, done);
    });

    it('returns 400 when password is empty', (done) => {
      const user: RegisterUser = {
        username: 'test',
        password: '',
        confirmPassword: 'pass',
      };

      request
        .post('/auth/register')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Password does not meet requirements.' });
        })
        .expect(400, done);
    });

    it('returns 400 when confirmPassword is not supplied', (done) => {
      const user: RegisterUser = {
        username: 'test',
        password: 'pass',
      };

      request
        .post('/auth/register')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Confirm password is required.' });
        })
        .expect(400, done);
    });

    it('returns 400 when confirmPassword is empty', (done) => {
      const user: RegisterUser = {
        username: 'test',
        password: 'pass',
        confirmPassword: '',
      };

      request
        .post('/auth/register')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Confirm password does not match password.' });
        })
        .expect(400, done);
    });

    it('returns 409 when password and confirmPassword do not match', (done) => {
      const user: RegisterUser = {
        username: 'test',
        password: 'pass',
        confirmPassword: 'notPass',
      };

      request
        .post('/auth/register')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Password and confirm password do not match.' });
        })
        .expect(409, done);
    });


    const persistantRequest = supertest.agent(app);
    it('returns 200 when registration is successful', (done) => {
      const user: RegisterUser = {
        username: 'supertestUser',
        password: 'password123',
        confirmPassword: 'password123',
      };

      persistantRequest
        .post('/auth/register')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'Registration successful.' });
        })
        .expect(200, done);
    });

    it('validates cookies after registration', (done) => {
      persistantRequest
        .get('/auth/validate')
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'User validated.' });
        })
        .expect(200, done);
    });

    afterAll((done) => {
      request
        .delete('/auth/register/cleanup')
        .send({ username: 'supertestUser' })
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'Deleted user successfully.' });
        })
        .expect(200, done);
    });
  });

  describe('/auth/login', () => {
    it('returns 403 when username is not supplied', (done) => {
      const user: LoginUser = {
        password: 'pass',
      };

      request
        .post('/auth/login')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Username is required.' });
        })
        .expect(403, done);
    });

    it('returns 403 when username is empty', (done) => {
      const user: LoginUser = {
        username: '',
        password: 'pass',
      };

      request
        .post('/auth/login')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Username cannot be empty.' });
        })
        .expect(403, done);
    });

    it('returns 403 when password is not supplied', (done) => {
      const user: LoginUser = {
        username: 'taken',
      };

      request
        .post('/auth/login')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Password is required.' });
        })
        .expect(403, done);
    });

    it('returns 403 when password is empty', (done) => {
      const user: LoginUser = {
        username: 'taken',
        password: '',
      };

      request
        .post('/auth/login')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Password cannot be empty.' });
        })
        .expect(403, done);
    });

    it('returns 403 when username and password are incorrect', (done) => {
      const user: LoginUser = {
        username: 'taken',
        password: 'wrongPassword',
      };

      request
        .post('/auth/login')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Username and/or password incorrect.' });
        })
        .expect(403, done);
    });

    const persistantRequest = supertest.agent(app);
    it('returns 200 when username and password are correct', (done) => {
      const user: LoginUser = {
        username: 'taken',
        password: 'correctPassword123',
      };

      persistantRequest
        .post('/auth/login')
        .send(user)
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'Successfully logged in.' });
        })
        .expect(200, done);
    });

    it('recieves cookies on successful login', (done) => {
      persistantRequest
        .get('/auth/validate')
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'User validated.' });
        })
        .expect(200, done);
    });
  });

  describe('/auth/validate', () => {
    it('returns 403 when not logged in', (done) => {
      request
        .get('/auth/validate')
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Invalid user session.' });
        })
        .expect(403, done);
    });

    const persistantRequest = supertest.agent(app);
    beforeAll((done) => {
      const user: LoginUser = {
        username: 'taken',
        password: 'correctPassword123',
      };

      persistantRequest
        .post('/auth/login')
        .send(user)
        .expect(200, done);
    });

    it('returns 200 when logged in', (done) => {
      persistantRequest
        .get('/auth/validate')
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'User validated.' });
        })
        .expect(200, done);
    });
  });

  describe('/auth/logout', () => {
    const persistantRequest = supertest.agent(app);
    beforeAll((done) => {
      const user: LoginUser = {
        username: 'taken',
        password: 'correctPassword123',
      };

      persistantRequest
        .post('/auth/login')
        .send(user)
        .expect(200, done);
    });

    it('returns 200 when successfully logging out', (done) => {
      persistantRequest
        .post('/auth/logout')
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ message: 'Successfully logged out.' });
        })
        .expect(200, done);
    });

    it('returns 205 if attempting to logout when not logged in', (done) => {
      persistantRequest
        .post('/auth/logout')
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ error: 'Cannot log out before logging in.' });
        })
        .expect(205, done);
    });
  });
});
