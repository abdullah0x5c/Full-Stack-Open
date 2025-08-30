const { test, after, beforeEach, expect } = require('node:test')
const assert = require('node:assert')
const { initialBlog, blogsInDb } = require('./blogsHelper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')


const api = supertest(app)

const idAsKeyExists = (response) => {
    response.body.forEach(obj => {
        if(!('key' in obj)){
            return 0
        }
    })
}

beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users')
        .send({
            username: "testuser1", 
            name: "testuser1",
            password: "testpass"
        })
        .expect(201)
})

test('can i log in', async () => {
    const login = await api.post('/api/login').send({
        username: "testuser1",
        password: "testpass"
    })
        .expect(200)
})

after( async () => {
    await mongoose.connection.close()
})


