// useState is used to store and update values on the screen
import { useState } from 'react'

// axios is used to send HTTP requests to the backend API
import axios from 'axios'

// Card is a Bootstrap component - gives a nice box/card design
import Card from 'react-bootstrap/Card'

// useNavigate is used to redirect user to another page after login
import { useNavigate } from 'react-router-dom'

// toast is used to show success or error popup messages
import { toast } from 'react-toastify'

const Login = () => {

  // email state stores whatever user types in the email input box
  const [email, setEmail] = useState("")

  // password state stores whatever user types in the password input box
  const [password, setPassword] = useState("")

  // navigate is a function that redirects user to another page
  const navigate = useNavigate()

  // This function runs when user clicks the Login button
  const handleLoginSubmit = async () => {
    try {
      // We send a POST request to backend login API
      // We send email and password so backend can check if user exists
      const apiResponse = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKED}/login`,
        {
          email: email,
          pass: password   // backend expects field name 'pass' not 'password'
        }
      )

      // Print the response in console for debugging
      console.log(apiResponse.data, "login response")

      // Save the token in localStorage
      // Token is like a key - we use it to access protected pages
      localStorage.setItem("token", apiResponse.data.token)

      // Show a green success popup message
      toast.success("Login Successful!")

      // Redirect user to dashboard page after successful login
      navigate("/dashboard")

    } catch (error) {
      // If login fails, print error in console
      console.log(error)

      // Show a red error popup message
      toast.error("Login Failed! Check your email or password.")
    }
  }

  return (
    // m-5 adds margin around the page
    <div className="m-5">

      {/* Card gives a nice centered box design
          maxWidth 400px keeps the form small and centered */}
      <Card className="text-center" style={{ maxWidth: "400px", margin: "auto" }}>
        <Card.Body>

          {/* Title of the card */}
          <Card.Title className="mb-4">Login</Card.Title>

          {/* Email input box
              value={email} shows current email state value
              onChange updates email state every time user types */}
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input box
              type="password" hides the characters while typing
              onChange updates password state every time user types */}
          <input
            type="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login button - calls handleLoginSubmit when clicked */}
          <button className="btn btn-success w-100" onClick={handleLoginSubmit}>
            Login
          </button>

          <br /><br />

          {/* Link to register page if user doesn't have an account */}
          <p className="text-danger">
            Don't have an account? <a href="/register">Register</a>
          </p>

        </Card.Body>
      </Card>
    </div>
  )
}

export default Login
