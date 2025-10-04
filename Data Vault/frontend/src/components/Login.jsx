import { useState } from "react"
import { login } from './data.jsx'

function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    try {
      await login(username, password)
      if (onLogin) onLogin()
    } catch (error) {
      setError(error.response?.data?.error || "Login failed")
    }
  }

  return (
    <>
      <div className="container p-3">
        <h2 className="d-flex justify-content-center"><strong>Login</strong></h2>
        <h4 className="d-flex justify-content-center my-2">Enter your credentials</h4>
        
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex flex-column align-items-center">
            <label className="form-label" htmlFor="loginUsername">Username</label>
            <input
              id="loginUsername"
              className="form-control mb-3"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            <label className="form-label" htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              className="form-control mb-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button
              className="btn btn-dark rounded-5"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
