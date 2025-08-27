const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  })

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

blogsRouter.delete('/:id', async (req, res) => {
  const deleteBlog = await Blog.findByIdAndDelete(req.params.id)
  if(deleteBlog){
      res.status(204).end()
  }
})

blogsRouter.delete('/', (request, response) => {
  Blog.deleteMany({})
    .then(result => {
      response.status(200).json({
        message: 'Successfully deleted.'
      })
    })
})

module.exports = blogsRouter
