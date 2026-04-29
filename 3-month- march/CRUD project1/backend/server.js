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
console.log("Hello Node js Project Started ")
const express = require('express') // Node js framework
const app = express() // app - variable - stroe express function
const mongoose = require('mongoose') // Library - connect mongodb Database
const cors = require('cors') // Library - solve cors error

app.use(express.json()) // convert all datta into json format 
app.use(cors())

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/item-database').then(() => console.log('mongo DB connected')).catch((error) => console.log(error))
// Schema - Model - Data base table structure 
// values store database - structure

const ItemsSchema = new mongoose.Schema({
    name: String,
    description: String,
    SellingPrice: Number,
    purchasePrice: Number,
    quantity: Number,
    unit: String

})
const Items = new mongoose.model('Items', ItemsSchema) // Table Name / collection Name - Items

//API 1 - Create Item 

app.post('/api/create-item', async (req, res) => { // simple syntax

    try {
        const { name, description, SellingPrice, purchasePrice, quantity, unit } = req.body
        const SaveItem = new Items(
            {
                name,
                description,
                SellingPrice,
                purchasePrice,
                quantity,
                unit
            }
        )

        await SaveItem.save()
        res.status(201).json({ message: 'Item Created', data: SaveItem })
    } catch (error) {
        console.log(error)
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
app.delete('/api/delete-item', (req, res) => {

    try {

    } catch (error) {
        console.log(error)
    }

})

//API 1 - GetAll Item
app.get('/api/get-all-item', async (req, res) => {

    try {
        const items = await Items.find()
        res.status(200).json({ message: "get all item", data: items });
    } catch (error) {
        console.log(error)
    }
})


//Health API 
app.get('/helth', (req, res) => {
    res.status(200).json({ message: 'server is Running' })
})



//Server Start

const PORT = 9090

app.listen(PORT, () => {
    console.log('Server Started')
})