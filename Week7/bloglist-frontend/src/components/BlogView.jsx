import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Like from './Like'
import blogService from '../services/blogs'
import commentsService from '../services/comments'
import { deleteBlog, updateBlog } from '../reducers/blogsReducer'

const BlogView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    const foundBlog = blogs.find((b) => b.id === id)
    if (foundBlog) {
      setBlog(foundBlog)
    } else {
      blogService.getAll().then((allBlogs) => {
        const foundBlog = allBlogs.find((b) => b.id === id)
        if (foundBlog) {
          setBlog(foundBlog)
        }
      })
    }
  }, [id, blogs])

  if (!blog) {
    return <div>Loading...</div>
  }

  const handleDelete = async () => {
    if (window.confirm('Do you really want to delete this blog?')) {
      await dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {
      const updatedBlog = await commentsService.addComment(blog.id, comment)
      dispatch(updateBlog(updatedBlog))
      setBlog(updatedBlog)
      setComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        <Like blog={blog} user={user} />
      </div>
      <div>
        Added by:{' '}
        {blog.user
          ? typeof blog.user === 'string'
            ? blog.user
            : blog.user.name || blog.user.username || 'unknown'
          : 'unknown'}
      </div>
      {blog.user && user && blog.user.username === user.username && (
        <button onClick={handleDelete}>remove</button>
      )}
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))
        ) : (
          <li>No comments yet</li>
        )}
      </ul>
    </div>
  )
}

export default BlogView

