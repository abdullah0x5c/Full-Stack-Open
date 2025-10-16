import { useState } from "react"
import Like from "./Like"
import blogservice from '../services/blogs.js'

const Blog = ({ blog, user }) => {
  let [view, setView] = useState(false)
  let [deleted, setDeleted] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogCollapsed = () => (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setView(!view)}>view</button>
    </div>
  )

  const handleDelete = (id) => {
    let confirmation = confirm("do you really want to delete this blog?")
    if(confirmation)
    {blogservice.deleteBlog(id)
    setDeleted(1)}
  }

  const blogExpanded = () => {
    
    return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setView(!view)}>hide</button>
  <br></br>
  <div className="blogUrl">{blog.url}</div>
  <br></br>
  <div className="blogLikes"><Like blog={blog} user={user}/></div>
      <br></br>
      <div>
        Added by: {
          blog.user
            ? (typeof blog.user === 'string' ? blog.user : (blog.user.name || blog.user.username || 'unknown1'))
            : 'unknown2'
        }
      </div>
      {blog.user && user && blog.user.username === user.username && (
        <button onClick={() => handleDelete(blog.id)}>remove</button>
      )}
    </div>
  )}

  return (
    deleted? (<></>) :(view ? blogExpanded() : blogCollapsed())
  )
}
//   ( 
//   <div>
//     <div>{blog.title}</div>
//     <div>{blog.author}</div>
//     <br></br>
//   </div>  
// )

export default Blog