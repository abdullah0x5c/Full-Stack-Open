import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import { appendBlog } from '../reducers/blogsReducer'

const AddBlog = (props) => {
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState(false)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = async (event) => {
    event.preventDefault()
    try {
      const upload = await blogService.uploadBlog({
        title: title,
        author: author,
        url: url,
        likes: 0,
      })
      dispatch(appendBlog(upload))
      dispatch(
        setNotification(`Blog Uploaded - ${upload.title} by ${upload.author}`)
      )
      setTimeout(() => dispatch(clearNotification()), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      setNewBlog(false)
    } catch (error) {
      props.setError(error)
      setTimeout(() => props.setError(null), 5000)
    }
  }

  const newBlogDiv = () => {
    return (
      <div>
        <h3>Add a new Blog</h3>
        <form onSubmit={handleBlog}>
          <div>
            <label htmlFor="title">title:</label>
            <input
              id="title"
              type="text"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <label htmlFor="author">author:</label>
            <input
              id="author"
              type="text"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">url:</label>
            <input
              id="url"
              type="text"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setNewBlog(!newBlog)}>
            cancel
          </button>
        </form>
      </div>
    )
  }

  return (
    <>
      {newBlog ? (
        newBlogDiv()
      ) : (
        <button onClick={() => setNewBlog(!newBlog)}>Add New Blog</button>
      )}
    </>
  )
}

export default AddBlog
