// Import Items model to perform database operations (save, find, update, delete)
const Items = require('./../models/ItemsModel')

// ----------------------
// CREATE - Add new item to database
// ----------------------
const addItem = async (req, res) => {
    try { 
        // req.userId is set by authMiddleware - it tells us who is logged in
        // Printing it in console for debugging
        console.log(req.userId, " =====> userId ")

        // Read item data sent from frontend form
        // req.body contains all the data frontend sent
        const { name, decription, sellingPrice, purchasePrice, quantity, unit } = req.body

        // Create a new Items object with the data from frontend
        // We also add userId so we know which user created this item
        const saveItem = new Items({
            name,
            decription,
            sellingPrice,
            purchasePrice,
            quantity,
            unit,
            userId: req.userId   // attach logged-in user's ID to this item
        })

        // .save() actually saves the item to MongoDB database
        await saveItem.save()

        // Send success response with the saved item data
        // status 201 means "Created" - new item was created successfully
        res.status(201).json({
            message: "Item Created",
            data: saveItem
        })

    } catch (error) {
        // If any error happens, print it and send error response
        console.log(error)
        res.status(500).json({ message: "Error creating item", error: error.message })
    }
}

// ----------------------
// READ - Get all items of the logged-in user
// ----------------------
const getAllItems = async (req, res) => {
    try {
        // Items.find() fetches all items from MongoDB that match the condition
        // { userId: req.userId } means only get items that belong to logged-in user
        // This way each user only sees their own items
        const items = await Items.find({ userId: req.userId })

        // Send the list of items back to frontend
        // status 200 means "OK" - request was successful
        res.status(200).json({
            message: "Get All Item List",
            data: items
        })

    } catch (error) {
        // If any error happens, print it and send error response
        console.log(error)
        res.status(500).json({ message: "Error fetching items", error: error.message })
    }
}

// ----------------------
// DELETE - Remove an item from database by its ID
// ----------------------
const deleteItem = async (req, res) => {
    try {
        // req.params contains values from the URL
        // e.g. if URL is /delete-item/abc123, then req.params.id = "abc123"
        const { id } = req.params

        // findByIdAndDelete() finds the item with this ID and deletes it from MongoDB
        const deletedItem = await Items.findByIdAndDelete(id)

        // Send success response with the deleted item data
        res.status(200).json({
            message: "Item Deleted",
            data: deletedItem
        })

    } catch (error) {
        // If any error happens, print it and send error response
        console.log(error)
        res.status(500).json({ message: "Error deleting item", error: error.message })
    }
}

// ----------------------
// UPDATE - Edit an existing item in database
// ----------------------
const editItem = async (req, res) => {
    try {
        // Read the item ID and all updated field values from request body
        // Frontend sends the item ID along with the new values
        const { id, name, decription, sellingPrice, purchasePrice, quantity, unit } = req.body

        // findByIdAndUpdate() finds item by ID and updates it with new values
        // First argument: id - which item to update
        // Second argument: the new values to set
        // { new: true } means return the updated item (not the old one)
        const updatedItem = await Items.findByIdAndUpdate(
            id,
            { name, decription, sellingPrice, purchasePrice, quantity, unit },
            { new: true }
        )

        // Send success response with the updated item data
        res.status(200).json({
            message: "Item Updated",
            data: updatedItem
        })

    } catch (error) {
        // If any error happens, print it and send error response
        console.log(error)
        res.status(500).json({ message: "Error updating item", error: error.message })
    }
}

// Export all 4 functions so we can use them in server.js
module.exports = { addItem, getAllItems, deleteItem, editItem }
