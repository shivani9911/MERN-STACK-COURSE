// useState is used to store and update values on the screen
import { useState } from 'react'

// axios is used to send HTTP requests to the backend API
import axios from 'axios'

// Card is a Bootstrap component - gives a nice box/card design
import Card from 'react-bootstrap/Card'

// useNavigate is used to redirect user to another page after register
import { useNavigate } from 'react-router-dom'

// toast is used to show success or error popup messages
import { toast } from 'react-toastify'

const Register = () => {

  // navigate is a function that redirects user to another page
  const navigate = useNavigate()

  // name state stores whatever user types in the name input box
  const [name, setName] = useState("")

  // email state stores whatever user types in the email input box
  const [email, setEmail] = useState("")

  // password state stores whatever user types in the password input box
  const [password, setPassword] = useState("")

  // This function runs when user clicks the Register button
  const submitRegisterForm = async () => {
    try {
      // We send a POST request to backend register API
      // We send name, email and password to create a new account
      const apiResponse = await axios.post(
        `${import.meta.env.VITE_API_URL_BACKED}/register`,
        {
          name: name,
          email: email,
          pass: password   // backend expects field name 'pass' not 'password'
        }
      )

      // Print the response in console for debugging
      console.log(apiResponse.data, "register response")

      // Save the token in localStorage after successful registration
      // Token is like a key - we use it to access protected pages
      localStorage.setItem("token", apiResponse.data.token)

      // Show a green success popup message
      toast.success("Account Created Successfully!")

      // Redirect user to dashboard page after successful registration
      navigate("/dashboard")

    } catch (error) {
      // If registration fails, print error in console
      console.log(error)

      // Show a red error popup message
      // If backend sends a message, show that, otherwise show default message
      toast.error(error.response?.data?.message || "Registration Failed!")
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
          <Card.Title className="mb-4">Register</Card.Title>

          {/* Name input box
              onChange updates name state every time user types */}
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email input box
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

          {/* Register button - calls submitRegisterForm when clicked */}
          <button className="btn btn-success w-100" onClick={submitRegisterForm}>
            Register
          </button>

          <br /><br />

          {/* Link to login page if user already has an account */}
          <p className="text-danger">
            Already have an account? <a href="/">Login</a>
          </p>

        </Card.Body>
      </Card>
    </div>
  )
}

export default Register
