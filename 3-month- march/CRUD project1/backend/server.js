//Backend project
//Node js
//Express js
//DB - MongoDB

//API List

//1.  API create Item - get Data values from front end (Items Details) and store into DB 

//2.  API Update Item - get items Dteails from front end which item we need to Update.

//3. API Delete Item -get Item Details From front end an delete this record from database

//4.API get All Records - get All records from DB and show to UI Front end

//console.log("Hello Node Js")
//const getData = () => {
//}
//function getData(){ 
//}
console.log("Hello Node js Project Started ") // server start message
//Required libraries import
const express = require('express') // Node js framework
const app = express() // app - variable - stroe express function // Express app initialize
const mongoose = require('mongoose') // Library - connect mongodb Database
const cors = require('cors') // Library - solve cors error // error handle krnysathi

app.use(express.json()) // convert all datta into json format 
app.use(cors()) // frontend-backend connection allow krto

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/item-database').then(() => console.log('mongo DB connected')).catch((error) => console.log(error))
// Schema - Model - Data base table structure 
// values store database - structure
const ItemsSchema = new mongoose.Schema({
    name: String,
    description: String,
    sellingPrice: Number,
    purchasePrice: Number,
    quantity: Number,
    unit: String

})
const Items = new mongoose.model('Items', ItemsSchema) // Table Name / collection Name - Items

//API 1 - Create Item - new item add krnyasathi

app.post('/api/create-item', async (req, res) => { // simple syntax

    try {
        //new item object create 
        const { name, description, sellingPrice, purchasePrice, quantity, unit } = req.body
        const SaveItem = new Items(
            {
                name,
                description,
                sellingPrice,
                purchasePrice,
                quantity,
                unit
            }
        )
        //database madhe save
        await SaveItem.save()
        res.status(201).json({ message: 'Item Created', data: SaveItem })//response send
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        });
    }
})

//API 1 - Update/Edit Item
app.put('/api/update-item', (req, res) => {

    try {

    } catch (error) {
        console.log(error)
    }

})

//API 1 - Delete Item
app.delete('/api/delete-item/:id', async(req, res) => {

    try {

        const { id, } = req.params

        const deleteItem = await Items.findByIdAndDelete(id)
        res.status(200).json({ message: "Item Deleted", deleteItem: deleteItem });

    } catch (error) {
        console.log(error)
    }

})

//API 1 - GetAll Item
app.get('/api/get-all-item', async (req, res) => {

    try {
        const items = await Items.find()//data madhun all data fetch
        res.status(200).json({ message: "get all item", data: items });
    } catch (error) {
        console.log(error)
    }
})


//Health API 
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'server is Running' })
})



//Server Start

const PORT = 9090

app.listen(PORT, () => {
    console.log('Server Started')
})