const app = require('../server');
const request = require('supertest');

describe("Test root path", () => {
    test("It should response the GET method", done => {
        request(app)
            .get("/")
            .then(res => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
})