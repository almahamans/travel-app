const app = require('../server');
const request = require('supertest');
//const request = supertest(app);


const GEONAMES_USERNAME = process.env.geo_key;

describe('Post Endpoints', () => {
    it('get geo name locations', async () => {
        const res = await request(app)
            .post('/geonames-locations')
            .send({
                BASE_URL: `http://api.geonames.org/searchJSON?formatted=true&q=manchester&username=${GEONAMES_USERNAME}`,
            });

        expect(res.statusCode).toEqual(200);
    });
});