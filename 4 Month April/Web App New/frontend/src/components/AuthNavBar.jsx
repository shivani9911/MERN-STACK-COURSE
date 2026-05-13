// useNavigate is used to redirect user to another page
// useLocation is used to check which page/path user is currently on
import { useNavigate, useLocation } from 'react-router-dom'

// These are the pages where we do NOT want to show the navbar
// Login page "/" and Register page "/register" should not have navbar
const PUBLIC_ROUTES = ['/', '/register']

const AuthNavBar = () => {

  // navigate lets us redirect user to another page
  const navigate = useNavigate()

  // location.pathname tells us the current page URL like "/dashboard" or "/"
  const location = useLocation()

  // If current page is login or register, return null (don't show navbar at all)
  if (PUBLIC_ROUTES.includes(location.pathname)) {
    return null
  }

  // This function runs when user clicks the Logout button
  const handleLogout = () => {
    // Remove token from localStorage - this logs the user out
    localStorage.removeItem("token")

    // Redirect user to login page after logout
    navigate("/")
  }

  return (
    // d-flex makes items sit side by side in a row
    // bg-dark gives dark background color
    // px-4 py-2 adds padding inside the navbar
    <div className="d-flex align-items-center bg-dark px-4 py-2">

      {/* App Logo / Name - shown on the left side */}
      <div className="me-4">
        <h3 className="text-white mb-0">MyApp</h3>
      </div>

      {/* Link to Dashboard page */}
      <div className="me-4">
        <a href="/dashboard" className="text-white text-decoration-none fs-5">Dashboard</a>
      </div>

      {/* Link to Items page */}
      <div className="me-4">
        <a href="/item" className="text-white text-decoration-none fs-5">Items</a>
      </div>

      {/* Logout button - ms-auto pushes it to the far right side */}
      <div className="ms-auto">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  )
}

export default AuthNavBar
