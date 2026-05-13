const Items = require('./../models/ItemsModel')

const addItem = async (req,res) => {
    try {
        // Get item data sent from frontend
        const { name, decription, sellingPrice, purchasePrice, quantity, unit } = req.body

        // Create new item object using model
        const saveItem = new Items({
            name ,
            decription,
            sellingPrice,
            purchasePrice,
            quantity,
            unit
        })
        // Save item into MongoDB
        await saveItem.save()
        // Send response to frontend
        res.status(201).json(
            
            {
            message: "Item Created",
            data: saveItem
            }
    
    )

    } catch (error) {

        // Print error in console
        console.log(error)

    }
}

const getAllItems = async (req,res) => {

    try {

        // Fetch all documents from Items collection
        const items = await Items.find()

        // Send data to frontend
        res.status(200).json({
            message: "Get All Item List",
            data: items
        })

    } catch (error) {

        console.log(error)

    }
}


const deleteItem = async (req,res) => {
    try {

        // Get item ID from URL parameters
        const { id } = req.params

        // Find item by ID and delete it
        const deleteItem = await Items.findByIdAndDelete(id)

        // Send success response
        res.status(200).json({
            message: "Item Deleted",
            deleteItem: deleteItem
        })

    } catch (error) {

        console.log(error)

    }

}

const editItem = async (req,res) => {
    try {

        // Here we will receive item ID and updated data from frontend
        // Then we will update record in database using mongoose update query

    } catch (error) {

        console.log(error)

    }
}

module.exports  = { addItem, getAllItems, deleteItem, editItem }