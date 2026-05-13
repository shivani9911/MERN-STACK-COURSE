// Backed Project // Node js  // Express Js // DB - MongoDb
// API's - url - DB operations - CRUD

// Import Express framework (used to create server and APIs)
const express = require('express')

// Create express application instance
const app = express()

// Import CORS library (allows frontend apps to call backend APIs)
const cors = require('cors')

// Connect MongoDB Database
const { connectDB } = require('./config/db') // Inform Function from another file

const { addItem , editItem , deleteItem , getAllItems} = require('./controllers/itemsControllers')

// Middleware: convert incoming request data into JSON format
// const userInfo = { "name" : "hoc" }
app.use(express.json())

// Middleware: enable Cross-Origin Resource Sharing
app.use(cors())


// ----------------------
// MongoDB Database Connection
// ----------------------
connectDB()



// POST API to create new item
app.post("/api/create-item", addItem)


// PUT API used to update existing item
app.put("/api/update-item", editItem)


// DELETE API to remove item from database
app.delete("/api/delete-item/:id", deleteItem)


// GET API to fetch all items from database
app.get("/api/get-all-item", getAllItems)


// Simple API to check server is running or not
app.get("/helth", (req, res) => {

    res.status(200).json({
        message: "Server is Runing"
    })

})

// ----------------------
// Server Start
// ----------------------

// Define port number where server will run
const PORT = 9090

// Start express server
app.listen(PORT, () => {
    // Show message when server starts
    console.log('Server Started')
})