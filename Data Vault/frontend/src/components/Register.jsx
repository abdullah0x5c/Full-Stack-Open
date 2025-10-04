import { useState } from "react"
import { register } from './data.jsx'

function Register({ onRegister }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    try {
      await register(username, password)
      if (onRegister) onRegister()
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed")
    }
  }

  return (
    <>
      <div className="container p-3">
        <h2 className="d-flex justify-content-center"><strong>Register</strong></h2>
        <h4 className="d-flex justify-content-center my-2">Create your account</h4>
        
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex flex-column align-items-center">
            <label className="form-label" htmlFor="registerUsername">Username</label>
            <input
              id="registerUsername"
              className="form-control mb-3"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            <label className="form-label" htmlFor="registerPassword">Password</label>
            <input
              id="registerPassword"
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
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register