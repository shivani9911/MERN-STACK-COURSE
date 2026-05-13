const mongoose = require('mongoose') 

// Schema - Model (Database Structure)
// ----------------------
// Define structure of item document in MongoDB
const itemsSchema = new mongoose.Schema({
    // Item name
    name: String,
    // Item description
    decription: String,
    // Selling price of item
    sellingPrice: Number,
    // Purchase price of item
    purchasePrice: Number,
    // Available quantity
    quantity: Number,
    // Unit type (kg, pcs, box etc)
    unit: String
})

// Create collection/table called "Items"
const Items = mongoose.model("Items", itemsSchema)


module.exports = Items
