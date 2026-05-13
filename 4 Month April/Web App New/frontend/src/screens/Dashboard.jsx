// useEffect runs code when the page first loads
// useState stores and updates values on the screen
import { useEffect, useState } from 'react'

// axios is used to send HTTP requests to the backend API
import axios from 'axios'

const Dashboard = () => {

  // dashboardData stores the counts we get from backend (items, users, stock value)
  // null means no data loaded yet
  const [dashboardData, setDashboardData] = useState(null)

  // This function fetches dashboard data from backend
  const getDashboardData = async () => {
    try {
      // Get token from localStorage - we need it to prove we are logged in
      const token = localStorage.getItem("token")

      // Send GET request to backend dashboard API
      // We pass token in headers so backend knows who is making the request
      const apiResponse = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKED}/get-dashboard`,
        {
          headers: {
            // x-auth-token is the header name backend is checking for the token
            "x-auth-token": token
          }
        }
      )

      // Print response in console for debugging
      console.log(apiResponse.data, "dashboard data")

      // Save the data in state so we can show it on screen
      setDashboardData(apiResponse.data.data)

    } catch (error) {
      // If request fails, print error in console
      console.log(error)
    }
  }

  // useEffect runs getDashboardData once when the page first opens
  // Empty array [] means run only once, not on every re-render
  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    // container adds padding on left and right
    // my-5 adds margin on top and bottom
    <div className="container my-5">

      {/* Page heading */}
      <h2 className="text-center mb-4">Dashboard</h2>

      {/* row creates a horizontal layout for the 3 cards */}
      <div className="row">

        {/* Card 1 - Total Items count
            col-md-4 means each card takes 4 columns (3 cards = 12 columns total) */}
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Items</h5>

              {/* If dashboardData is loaded show the count, otherwise show 0 */}
              <h2 className="text-primary">{dashboardData ? dashboardData.totalItems : 0}</h2>

              {/* Button to go to items page */}
              <a href="/item" className="btn btn-primary mt-2">Manage Items</a>
            </div>
          </div>
        </div>

        {/* Card 2 - Total Users count */}
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>

              {/* If dashboardData is loaded show the count, otherwise show 0 */}
              <h2 className="text-success">{dashboardData ? dashboardData.totalUsers : 0}</h2>

              <a href="#" className="btn btn-success mt-2">View Users</a>
            </div>
          </div>
        </div>

        {/* Card 3 - Total Stock Value */}
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Stock Value</h5>

              {/* ₹ is the Indian Rupee symbol
                  If dashboardData is loaded show the value, otherwise show 0 */}
              <h2 className="text-warning">₹{dashboardData ? dashboardData.totalStockValue : 0}</h2>

              <a href="/item" className="btn btn-warning mt-2">View Items</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
