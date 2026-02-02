import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function App() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <>
      <div className="app">
        <header className="py-4 px-8 bg-gray-800 text-white">
          <nav className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              AI Social Media
            </Link>
            <div className="flex items-center">
              <Link
                to="/add"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Create Post
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
