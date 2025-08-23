const Blog = require('../models/blog')

const initialBlog = [
    {
      title: "Understanding JavaScript Closures",
      author: "John Doe",
      url: "https://example.com/js-closures",
      likes: 15
    },
    {
      title: "A Guide to Modern CSS Flexbox",
      author: "Jane Smith",
      url: "https://example.com/css-flexbox",
      likes: 25
    },
    {
      title: "Building REST APIs with Node.js and Express",
      author: "Alex Johnson",
      url: "https://example.com/node-rest-api",
      likes: 40
    },
    {
      title: "Getting Started with MongoDB",
      author: "Emily Davis",
      url: "https://example.com/mongodb-basics",
      likes: 12
    },
    {
      title: "Deploying Apps with Docker",
      author: "Michael Brown",
      url: "https://example.com/docker-deployment",
      likes: 33
    }
  ]  


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blogs => blogs.toJSON())
}

module.exports = {
  initialBlog, blogsInDb
}