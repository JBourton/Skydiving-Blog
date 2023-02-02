const app = require('./server');
const request = require('supertest');

describe("Test /getIMG/", () => {
    describe("Attempt to GET all image urls and captions at /getIMG/getAll/:dzNum", () => {
        test("404 Not Found returned when user directed to comment entity that doesn't exist", () => {
            return request(app)
            .post('/getIMG/getAll/9')
            .expect(404)
        })
    })
});


describe("GET /fetchDropzone/", () => {
    test("404 Not Found returned when user directed to dropzone entity that doesn't exist", () => {
        return request(app)
        .get("/fetchDropzone")
        .expect(404)
    })
});