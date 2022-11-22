const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);


describe('Endpoint test', () => {
  test('/test', async () => {
    const response = await request.get('/test');
    expect(response.status).toBe(200)
  })
})