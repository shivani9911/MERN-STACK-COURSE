// mongoose is used to connect Node.js with MongoDB
// It also helps us define the structure of our data
const mongoose = require('mongoose')

// Schema defines the structure of one document (row) in MongoDB collection (table)
// This tells MongoDB what fields an Item should have
const itemsSchema = new mongoose.Schema({

    // userId stores which user created this item
    // mongoose.Schema.Types.ObjectId means it stores a MongoDB ID (reference to Users collection)
    // ref: "Users" means this ID points to a document in the Users collection
    // required: true means every item MUST have a userId - cannot be empty
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },

    // name field - stores the item name as text
    name: String,

    // decription field - stores item description as text
    // Note: field name is 'decription' (typo in original - keep same to avoid breaking)
    decription: String,

    // sellingPrice field - stores the price at which item is sold
    sellingPrice: Number,

    // purchasePrice field - stores the price at which item was bought
    purchasePrice: Number,

    // quantity field - stores how many units of item are available
    quantity: Number,

    // unit field - stores the unit type like Kg, Piece, Box etc
    unit: String
})

// mongoose.model() creates a MongoDB collection called "Items"
// First argument "Items" is the collection name in MongoDB
// Second argument itemsSchema is the structure we defined above
const Items = mongoose.model("Items", itemsSchema)

// Export Items so we can use it in controllers to save/find/delete items
module.exports = Items
