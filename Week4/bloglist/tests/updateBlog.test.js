const { test, after, beforeEach, expect } = require('node:test')
const assert = require('node:assert')
const { initialBlog, blogsInDb } = require('./blogsHelper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlog)
})

test('is the blog updated?', async () => {
    // Upload a new blog
    const upload = await api.post('/api/blogs').send({
        "title": "ShahabNama",
        "author": "Abdullah",
        "url": "https://example.com/shahabnama",
        "likes": 1
    })

    // Get the uploaded blog by its id
    const blog1 = await api.get(`/api/blogs/${upload.body.id}`)

    // Update the blog
    const update = await api.put(`/api/blogs/${upload.body.id}`).send({
        "title": "ShahabNama Updated",
        "author": "Abdullah",
        "url": "https://example.com/shahabnama",
        "likes": 2
    })

    // Get the blog again after update
    const blog2 = await api.get(`/api/blogs/${upload.body.id}`)

    // Assert that the blog was updated
    assert.notDeepEqual(blog1.body, blog2.body)
})

after( async () => {
    await mongoose.connection.close()
})