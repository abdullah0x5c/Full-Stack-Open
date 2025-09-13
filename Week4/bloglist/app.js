const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/configs')
const logger = require('./utils/loggers')
const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const middleware = require('./utils/mioddleware')
const cors = require('cors')


const app = express()
app.use(cors({
  origin: 'http://localhost:5173'
}))

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.morganLogger)