import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import loginService from './services/login'
import registerService from './services/register'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import './styles.css'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [regiName, setRegiName] = useState('')
  const [regiUsername, setRegiUsername] = useState('')
  const [regiPassword, setRegiPassword] = useState('')

  const [user, setUser] = useState(null)

  const [error, setError] = useState(null)

  const [registerDiv, setRegisterDiv] = useState(false)

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      await registerService.register({
        name: regiName,
        username: regiUsername,
        password: regiPassword,
      })
      dispatch(setNotification(`User Registered - ${regiName}`))
      setTimeout(() => dispatch(clearNotification()), 5000)
      setRegiName('')
      setRegiUsername('')
      setRegiPassword('')
      setRegisterDiv(!registerDiv)
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
          <br></br>
          <button type="button" onClick={() => setRegisterDiv(!registerDiv)}>
            Do'nt have an account | Register
          </button>
        </form>
      </>
    )
  }

  const register = () => {
    return (
      <>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>
              Name
              <input
                type="text"
                value={regiName}
                onChange={({ target }) => setRegiName(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              username
              <input
                type="text"
                value={regiUsername}
                onChange={({ target }) => setRegiUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={regiPassword}
                onChange={({ target }) => setRegiPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">Register</button>
          <br></br>
          <button type="button" onClick={() => setRegisterDiv(!registerDiv)}>
            Already have an account | Login
          </button>
        </form>
      </>
    )
  }

  const Blogs = () => {
    return (
      <>
        <p>
          {user.name} logged in{' '}
          <button
            onClick={() => {
              setUser(null)
              blogService.setToken(null)
            }}
          >
            logout
          </button>
        </p>
        <AddBlog setError={setError} />
        <br></br>
        <br></br>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <>
              <Blog key={blog.id} blog={blog} user={user} />
            </>
          ))}
      </>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      dispatch(setNotification('Successfully Logged In.'))
      setTimeout(() => dispatch(clearNotification()), 5000)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError('Login Failed.')
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification} />
      <Error message={error} />
      {!user && !registerDiv && login()}
      {!user && registerDiv && register()}
      {user && Blogs()}
    </div>
  )
}

export default App
