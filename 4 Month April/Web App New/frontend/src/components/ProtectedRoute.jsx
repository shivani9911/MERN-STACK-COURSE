// We import Navigate from react-router-dom
// Navigate is used to redirect user to another page without clicking any link
import { Navigate } from 'react-router-dom'

// ProtectedRoute is a component that wraps pages which need login
// children means whatever page is inside this component (like Dashboard or Item)
export const ProtectedRoute = ({ children }) => {

  // We check localStorage to see if token is saved
  // Token is saved when user logs in successfully
  const token = localStorage.getItem("token")

  // If token is NOT found, user is not logged in
  // So we redirect them to login page "/"
  if (!token) {
    return <Navigate to="/" />
  }

  // If token IS found, user is logged in
  // So we show the actual page (Dashboard or Item)
  return children
}

// PublicRoute is a component that wraps Login and Register pages
// If user is already logged in, we don't want them to see login page again
export const PublicRoute = ({ children }) => {

  // Check if token exists in localStorage
  const token = localStorage.getItem("token")

  // If token IS found, user is already logged in
  // So we redirect them to dashboard directly
  if (token) {
    return <Navigate to="/dashboard" />
  }

  // If token is NOT found, user is not logged in
  // So we show the login or register page
  return children
}
