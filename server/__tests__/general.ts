import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('api is live', () => {
  describe('/ping', () => {
    it('recieve code 200 on get request', (done) => {
      request
        .get('/ping')
        .expect(200, done);
    });

    it('recives body with okay flag set to true', (done) => {
      request
        .get('/ping')
        .expect('content-type', /json/)
        .expect((response) => {
          expect(response.body).toEqual({ okay: true });
        })
        .expect(200, done);
    });
  });
});
