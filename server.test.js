const app = require('./server');
const request = require('supertest');

describe("Test /getIMG/", () => {
    describe("Attempt to GET all image urls and captions at /getIMG/getAll/:dzNum", () => {
        test("500 Internal Server Error returned when user directed to comment entity that doesn't exist", () => {
            return request(app)
            .get('/getIMG/getAll/9')
            .expect(500)
        })

        test("200 on fetching all images for a given dropzone", () => {
            return request(app)
            .get("/getIMG/getAll/0")
            .expect(200)
            .expect('Content-type', /json/);
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


describe("POST /postComment/:dzNum", () => {
    test("Successful comment post gives 200", () => {
        const data = {username: "Test"};
        return request(app)
        .post("/postComment/0")
        .send(data)
        .expect(200)
        .expect('Content-type', /json/);
    })
});

describe("POST /postIMG/:dzNum", () => {
    test("Successful image post gives 200", () => {
        const data = {"This is a description": "/"}
        return request(app)
        .post("/postIMG/0")
        .send(data)
        .expect(200)
        .expect('Content-type', /json/);
    })
});