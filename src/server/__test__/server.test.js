const request = require('supertest');
const app = require('../server/server');

const geo_key = process.env.geo_key;

describe('Post Endpoints', () => {
    test('get geo name locations', async () => {
        const res = await request(app)
            .post('/geo-name-locations')
            .send({
                BASE_URL: `http://api.geonames.org/searchJSON?formatted=true&q=manchester&username=${geo_key}`,
            });
        expect(res.statusCode).toEqual(200);
    });
});