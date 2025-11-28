import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <h2>Blogs</h2>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="blog-item">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList

