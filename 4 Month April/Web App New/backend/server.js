// dotenv loads our secret values from .env file into process.env
// We call this at the very top so all files can use process.env values
require('dotenv').config()

// express is a Node.js framework that helps us create a backend server easily
const express = require('express')

// app is our main server object - we use it to create routes and start server
const app = express()

// cors allows our frontend (running on different port) to talk to this backend
// Without cors, browser will block the request
const cors = require('cors')

// Import connectDB function from db.js to connect to MongoDB database
const { connectDB } = require('./config/db')

// Import item controller functions (add, edit, delete, getAll)
const { addItem, editItem, deleteItem, getAllItems } = require('./controllers/itemsControllers')

// Import auth controller functions (login, register)
const { login, register } = require('./controllers/authControllers')

// Import dashboard controller function
const { getDashboardCount } = require('./controllers/dashboardControllers')

// Import authMiddleware - this checks if user has a valid token before allowing access
const authMiddleware = require('./authMiddleware/authMiddleware')

// ----------------------
// Middleware Setup
// ----------------------

// express.json() allows our server to read JSON data sent from frontend
// Without this, req.body will be undefined
app.use(express.json())

// cors() allows all frontend origins to call this backend
// Without this, browser blocks requests from different ports
app.use(cors())

// Connect to MongoDB database when server starts
connectDB()

// ----------------------
// Auth Routes - No token needed for these
// ----------------------

// POST /api/login - user sends email and password, gets token back
app.post("/api/login", login)

// POST /api/register - user sends name, email, password, gets token back
app.post("/api/register", register)

// ----------------------
// Items Routes - Token required (authMiddleware runs first)
// ----------------------

// POST /api/create-item - add a new item to database
// authMiddleware runs first to check token, then addItem runs
app.post("/api/create-item", authMiddleware, addItem)

// GET /api/get-all-item - get all items of logged-in user
app.get("/api/get-all-item", authMiddleware, getAllItems)

// PUT /api/update-item - update an existing item
app.put("/api/update-item", authMiddleware, editItem)

// DELETE /api/delete-item/:id - delete item by its ID
// :id means the item ID comes from the URL like /delete-item/abc123
app.delete("/api/delete-item/:id", authMiddleware, deleteItem)

// ----------------------
// Dashboard Route - Token required
// ----------------------

// GET /api/get-dashboard - get total counts for dashboard page
app.get("/api/get-dashboard", authMiddleware, getDashboardCount)

// ----------------------
// Health Check Route - just to test if server is running
// ----------------------
app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Server is Running" })
})

// ----------------------
// Start Server
// ----------------------

// Read PORT from .env file, if not found use 1010 as default
const PORT = process.env.PORT || 1010

// Start the server and listen for incoming requests on the PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

