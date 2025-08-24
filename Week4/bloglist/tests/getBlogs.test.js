const { test, after, beforeEach, expect } = require('node:test')
const assert = require('node:assert')
const { initialBlog, blogsInDb } = require('./blogsHelper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)

const idAsKeyExists = (response) => {
    response.body.forEach(obj => {
        if(!('key' in obj)){
            return 0
        }
    })
}

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlog)
})

test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlog.length)
})

test('id as a property', async () => {
    const response = await api.get('/api/blogs')
    .expect(idAsKeyExists)
})


after( async () => {
    await mongoose.connection.close()
})


