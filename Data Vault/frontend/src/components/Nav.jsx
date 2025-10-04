import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from './data.jsx'

function Nav({ isLoggedIn, setIsLoggedIn, currentPage, setCurrentPage }) {
  const handleLogout = async () => {
    try {
      await logout()
      setIsLoggedIn(false)
      setCurrentPage('login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleRegisterClick = () => {
    setCurrentPage('register')
  }

  const handleLoginClick = () => {
    setCurrentPage('login')
  }

  return (
    <>
        <nav className='navbar navbar-expand bg-dark navbar-dark p-3 flex-d justify-content-center'>
          <div className='navbar-container-fluid d-flex justify-content-between align-items-center w-100'>
            <a className='navbar-brand'><strong>DATA VAULT</strong></a>
            {isLoggedIn ? (
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <div>
                {currentPage === 'login' && (
                  <button 
                    className="btn btn-outline-light btn-sm"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                )}
                {currentPage === 'register' && (
                  <button 
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </nav>
    </>
  )
}

export default Nav