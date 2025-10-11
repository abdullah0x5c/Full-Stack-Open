import React, { useState } from 'react'

import blogService from '../services/blogs'

const AddBlog = (props) => {

    const [newBlog, setNewBlog] = useState(false)

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleBlog = async event => {
        event.preventDefault()
        try {
          
          const upload = await blogService.uploadBlog(
          {
            title: title,
            author: author,
            url: url,
            likes: 0
          }
          )
          props.setBlogs([...props.blogs, upload])
          props.setNotification(`Blog Uploaded - ${upload.title} by ${upload.author}`)
          setTimeout(() => setNotification(null), 5000)
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
              <label>title:</label>
              <input type="text" onChange={({ target }) => setTitle(target.value)}/>
            </div>
            <div>
              <label>author:</label>
              <input type="text" onChange={({ target }) => setAuthor(target.value)}/>
            </div>
            <div>
              <label>url:</label>
              <input type="text" onChange={({ target }) => setUrl(target.value)}/>
            </div>
            <button type="submit" >Submit</button>
            <button onClick={() => setNewBlog(!newBlog)}>cancel</button>
          </form>
    </div>
        )
    }


    return (
      <>
        {newBlog? newBlogDiv():<button onClick={() => setNewBlog(!newBlog)}>Add New Blog</button>}
      </>
    )
  }

  export default AddBlog