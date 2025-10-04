import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Body from './components/Body'
import Login from './components/Login'
import Register from './components/Register'
import { getInitialCSRFToken } from './components/data.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('login')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial CSRF token when app loads
    getInitialCSRFToken()
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to get CSRF token:', error)
        setIsLoading(false)
      })
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage('login')
  }

  const handleRegister = () => {
    setIsLoggedIn(true)
    setCurrentPage('login')
  }

  const renderPage = () => {
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
    }

    if (isLoggedIn) {
      return <Body />
    }
    
    if (currentPage === 'register') {
      return <Register onRegister={handleRegister} />
    }
    
    return <Login onLogin={handleLogin} />
  }

  return (
    <>
      <Nav 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderPage()}
    </>
  )
}

export default App
