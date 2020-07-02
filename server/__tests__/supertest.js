import supertest from 'supertest';
import app from '../index';

describe('api is live', () => {
  const request = supertest(app);

  describe('/api/ping', () => {
    it('recieve code 200 on get request', (done) => {
      request
        .get('/api/ping')
        .expect(200, done);
    });

    it('recives body with okay flag set to true', (done) => {
      request
        .get('/api/ping')
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ okay: true });
        })
        .expect(200, done);
    });
  });
});
