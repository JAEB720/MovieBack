require('../models');

const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor = require('../models/Actor');

let movieId;
const BASE_URL = '/api/v1/movies'



const movie = {
    name: "Interstellar",
    image: "interstellar.png",
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: "2014-11-07",
}





    // POST --> (Create)
test("POST --> BASE_URL, should return statusCode 201, and res.body.name === movie.name", async() => {
    const res = await request(app)
        .post(`${BASE_URL}`)
        .send(movie)

        movieId = res.body.id

        // console.log(res.body)

        expect(res.status).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(movie.name)
        expect(res.body.image).toBe(movie.image)
        expect(res.body.synopsis).toBe(movie.synopsis)
        expect(res.body.releaseYear).toBe(movie.releaseYear)
})

    // GET --> (GetAll)
test("GET --> BASE_URL, should return statusCode 200, and res.body.length === 1", async() => {
    const res = await request(app)
        .get(`${BASE_URL}`)

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body[0].name).toBe(movie.name)
        expect(res.body[0].image).toBe(movie.image)
        expect(res.body[0].synopsis).toBe(movie.synopsis)
        expect(res.body[0].releaseYear).toBe(movie.releaseYear)

        expect(res.body[0].genres).toHaveLength(0)
        expect(res.body[0].directors).toHaveLength(0)
        expect(res.body[0].actors).toHaveLength(0)
})

    // GET --> (GetOne)
test("GET --> BASE_URL/:id, should return satusCode 200, and res.body.name === movie.name", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${movieId}`)

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(movie.name)
        expect(res.body.image).toBe(movie.image)
        expect(res.body.synopsis).toBe(movie.synopsis)
        expect(res.body.releaseYear).toBe(movie.releaseYear)

        expect(res.body.genres).toHaveLength(0)
        expect(res.body.directors).toHaveLength(0)
        expect(res.body.actors).toHaveLength(0)
})

    // PUT --> (Update)
test("PUT --> BASE_URL/:id, should return statusCode 200, and res.body.name === movieUpdate.name", async() => {


    const movieUpdate = {
        name: 'Inception',
        image: 'inception.png',
        synopsis: 'A skilled thief who steals secrets through dream-sharing technology is given a chance to erase his criminal history.',
        releaseYear: '2010-07-16',
    }




    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(movieUpdate.name)
        expect(res.body.image).toBe(movieUpdate.image)
        expect(res.body.synopsis).toBe(movieUpdate.synopsis)
        expect(res.body.releaseYear).toBe(movieUpdate.releaseYear)
})



        // SetGenres --> /movies/:id/genres
test("POST --> BASE_URL/:id/genres, should return statusCode 200, and res.body.length === 1", async() => {
    const genre = {
        name: "Sci-Fi",
    }

    const newGenre = await Genre.create(genre)

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([newGenre.id])

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)

        expect(res.body[0].id).toBeDefined()
        expect(res.body[0].id).toBe(newGenre.id)

    await newGenre.destroy()

})

        // SetDirectors --> /movies/:id/directors
test("POST --> BASE_URL/:id/directors, should return statusCode 200, and res.body.length === 1", async() => {
    const director = {
        firstName: "Christopher",
        lastName: "Nolan",
        nationality: "British",
        image: "nolan.png",
        birthday: "1970-07-30",
    }

    const newDirector = await Director.create(director)

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([newDirector.id])

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
        expect(res.body[0]).toBeDefined()
        expect(res.body[0].id).toBe(newDirector.id)

    await newDirector.destroy()
})





        // SetActors --> /movies/:id/actors
test("POST --> BASE_URL/:id/actors, should return statusCode 200, and res.body.length === 1", async() => {
    const actor = {
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "American",
        image: "leo.png",
        birthday: "1974-11-11",
    }

    

    const newActor = await Actor.create(actor)

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([newActor.id])

        // console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
        expect(res.body[0]).toBeDefined()
        expect(res.body[0].id).toBe(newActor.id)

    await newActor.destroy()
})
        
    // DELETE
test("DELETE --> BASE_URL/:id, should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)

        expect(res.status).toBe(204)
})
