require('../models');

const request = require('supertest');
const app = require('../app');


let directorId;
const BASE_URL = '/api/v1/directors';
const director = {
    firstName: "John",
    lastName: "Doe",
    nationality: "American",
    image: "johndoe.png",
    birthday: "1990-01-01",
};





    // POST -> (Create)
test("POST --> BASE_URL, should return statusCode 201, and res.body.firstName === director.firstName", async() => {
    const res = await request(app)
        .post(`${BASE_URL}`)
        .send(director)

        directorId = res.body.id

        // console.log(res.body)

        expect(res.status).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(director.firstName)
        expect(res.body.lastName).toBe(director.lastName)
        expect(res.body.nationality).toBe(director.nationality)
        expect(res.body.image).toBe(director.image)
        expect(res.body.birthday).toBe(director.birthday)
})


    // GET -> (GetAll)
test("GET --> BASE_URL, should return statusCode 200, and res.body.length === 1", async() => {
    const res = await request(app)
        .get(`${BASE_URL}`)

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
        expect(res.body[0].firstName).toBe(director.firstName)
        expect(res.body[0].lastName).toBe(director.lastName)
        expect(res.body[0].nationality).toBe(director.nationality)
        expect(res.body[0].image).toBe(director.image)
        expect(res.body[0].birthday).toBe(director.birthday)
})



    // GET -> (GetOne)
test("GET --> BASE_URL/:id, should return statusCode 200, and res.body.firstName === director.firstName", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${directorId}`)

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(director.firstName)
        expect(res.body.lastName).toBe(director.lastName)
        expect(res.body.nationality).toBe(director.nationality)
        expect(res.body.image).toBe(director.image)
        expect(res.body.birthday).toBe(director.birthday)
})



    // PUT -> (Update)
test("PUT --> BASE_URL/:id, should return statusCode 200, res.body.firstName === directorUpdate.name", async() => {
    const directorUpdate = {
        firstName: 'Jane',
        lastName: 'Smith',
        nationality: 'British',
        image: 'janesmith.png',
        birthday: '1985-05-05',
    };
    
    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(directorUpdate)

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(directorUpdate.firstName)
        expect(res.body.lastName).toBe(directorUpdate.lastName)
        expect(res.body.nationality).toBe(directorUpdate.nationality)
        expect(res.body.image).toBe(directorUpdate.image)
        expect(res.body.birthday).toBe(directorUpdate.birthday)
})

    // DELETE
test("DELETE --> BASE_URL/:id, should return statusCode 204, res.body.length === 0", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

        // console.log(res.body)

        expect(res.status).toBe(204)
        expect(res.body).toBeDefined()
})