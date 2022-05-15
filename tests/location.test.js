const request = require('supertest');
const app = require('../app');

describe('/search-location', ()=>{
    it('should return bad request if any result if any of the request is null', async () => {
        const { statusCode, body } = await request(app)
          .get('/search-location')
          .query({ street: 'Ikija Street' })
          .query({ city: '' })
          .query({ state: 'Lagos' })
          .query({ country: 'Nigeria' });
    
        expect(statusCode).toEqual(400);
    });
    it('should return internal error if it is not a valid request', async () => {
        const { statusCode, body } = await request(app)
          .get('/search-location')
          .query({ street: 'you' })
          .query({ city: 'me' })
          .query({ state: 'nothing' })
          .query({ country: 'see' });
    
        expect(statusCode).toEqual(500);
    });

    it('should return a successful request if it is a valid address', async () => {
        const { statusCode, body } = await request(app)
          .get('/search-location')
          .query({ street: 'Ikija Street' })
          .query({ city: 'Yaba' })
          .query({ state: 'Lagos' })
          .query({ country: 'Nigeria' });
    
        expect(statusCode).toEqual(200);
        expect(body).toEqual(
            expect.objectContaining({
            longtitude: expect.any(Number), 
            latitude: expect.any(Number),
            elevation: expect.any(Number), 
            timezone: expect.any(Number)
        }));

    });
})