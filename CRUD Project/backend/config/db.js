const mongoose = require('mongoose')


const connectDB = () => {
    try {
        // Connect Node.js server with MongoDB database
        //common URl Same for all/database name
        //mongodb://127.0.0.1:27017/item-database


        // If connection successful show message in console                    // If error occurs print error
        mongoose.connect("mongodb://127.0.0.1:27017/item-database").then(() => console.log("Mongo DB Connected")).catch((error) => console.log(error))

    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDB }