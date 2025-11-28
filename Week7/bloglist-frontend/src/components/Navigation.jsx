import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import blogService from '../services/blogs'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearUser())
    blogService.setToken(null)
  }

  if (!user) {
    return null
  }

  return (
    <nav>
      <Link to="/">blogs</Link> <Link to="/users">users</Link> {user.name}{' '}
      logged in <button onClick={handleLogout}>logout</button>
    </nav>
  )
}

export default Navigation
