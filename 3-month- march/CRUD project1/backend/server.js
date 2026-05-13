// // Backend Project // //Node js // //Express js  // //DB MongoDB

//expres js is framework of node js creat api use
const express = require('express')

//app=variable => stores express js
const app = express()

//cross 
const cors = require('cors')

//connect mongodb database
const { connectDB } = require('./config/db')

const {addItem , editItem , deleteItem ,  getAllItems} = require('./controllers/itemscontrollers')

// frontend converts all data in json format
app.use(express.json())

//middleware: enable Cross-origin Resource sharing
app.use(cors())

//----------------
// MongoDB database connection
//----------------

connectDB()


//POST API 1- Create Item
app.post("/api/create-item", addItem)


// PUT API 2- Update/Edit
app.put("/api/update-item", editItem)


// DELETE API - to remove database
app.delete("/api/delete-item/:id", deleteItem)


//API - GetAll Item
app.get("/api/get-all-item", getAllItems)


//simple API to check server  is running
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server Is Running" })
})


// -----------------
// Server Start
// ----------------

// Define port number when server will run
const PORT = 9090

//start express server
app.listen(PORT, () => {
    console.log('Server Started')
})