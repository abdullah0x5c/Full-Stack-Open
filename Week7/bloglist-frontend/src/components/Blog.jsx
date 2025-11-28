import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Like from './Like'
import { deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const isDeleted = !blogs.find((b) => b.id === blog.id)

  let [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogCollapsed = () => (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setView(!view)}>view</button>
    </div>
  )

  const handleDelete = (id) => {
    let confirmation = confirm('do you really want to delete this blog?')
    if (confirmation) {
      dispatch(deleteBlog(id))
    }
  }

  const blogExpanded = () => {
    return (
      <div style={blogStyle} className="blog">
        {blog.title} {blog.author}
        <button onClick={() => setView(!view)}>hide</button>
        <br></br>
        <div className="blogUrl">{blog.url}</div>
        <br></br>
        <div className="blogLikes">
          <Like blog={blog} user={user} />
        </div>
        <br></br>
        <div>
          Added by:{' '}
          {blog.user
            ? typeof blog.user === 'string'
              ? blog.user
              : blog.user.name || blog.user.username || 'unknown1'
            : 'unknown2'}
        </div>
        {blog.user && user && blog.user.username === user.username && (
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        )}
      </div>
    )
  }

  return isDeleted ? <></> : view ? blogExpanded() : blogCollapsed()
}
//   (
//   <div>
//     <div>{blog.title}</div>
//     <div>{blog.author}</div>
//     <br></br>
//   </div>
// )

export default Blog
