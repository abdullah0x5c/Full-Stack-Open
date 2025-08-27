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

test('is the blog deleted?', async () => {
    const upload = await api.post('/api/blogs').send({
        "title": "ShahabNama",
      "author": "Abdullah",
      "url": "https://example.com/shahabnama",
      "likes": 1
    })
    const deleteBlog = await api.delete(`/api/blogs/${upload.body.id}`)
    .expect(204)
})

after( async () => {
    await mongoose.connection.close()
})


