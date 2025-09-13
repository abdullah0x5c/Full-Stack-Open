import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import loginService from './services/login'
import blogService from './services/blogs'
import './styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const handleBlog = async event => {
    event.preventDefault()
    try {
      
      const upload = await blogService.uploadBlog(
      {
        title: title,
        author: author,
        url: url
      }
      )
      setBlogs([...blogs, upload])
      setNotification(`Blog Uploaded - ${upload.title} by ${upload.author}`)
      setTimeout(() => setNotification(null), 5000)
    } catch (error) {
      setError(error)
      setTimeout(() => setError(null), 5000)
      }



  }

  const login = () => {
    return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
    )
  }

  const Blogs = () => {
    return (
      <>

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
            <button type="submit" >login</button>
          </form>
        </div>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      setUser(user)
      blogService.setToken(user.token)
      setNotification("Successfully Logged In.")
      setTimeout(() => setNotification(null), 5000)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError("Login Failed.")
      setTimeout(() => setError(null), 5000)
    }

  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification}/>
      <Error message={error}/>
      {!user && login()}
      {user && Blogs()}
    </div>
  )
}

export default App